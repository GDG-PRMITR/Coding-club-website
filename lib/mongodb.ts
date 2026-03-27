import { MongoClient, type Db } from "mongodb";

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "website_stats";

if (!mongoUri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined = global.__mongoClientPromise;

function createClientPromise() {
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  const client = new MongoClient(mongoUri, {
    maxPoolSize: 10,
    minPoolSize: 0,
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 10000,
    // Prefer IPv4 locally to avoid SRV/IPv6 edge cases seen on some networks.
    family: 4,
  });

  const promise = client.connect();

  if (process.env.NODE_ENV !== "production") {
    global.__mongoClientPromise = promise;
  }

  return promise;
}

export async function getMongoDb(): Promise<Db> {
  if (!clientPromise) {
    clientPromise = createClientPromise();
  }

  try {
    const connectedClient = await clientPromise;
    return connectedClient.db(dbName);
  } catch (error) {
    // Reset cached promise so the next request can retry a fresh connection.
    clientPromise = undefined;
    if (process.env.NODE_ENV !== "production") {
      global.__mongoClientPromise = undefined;
    }
    throw error;
  }
}
