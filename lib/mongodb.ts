import { MongoClient, type Db } from "mongodb";

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "coding_club";

declare global {
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
    family: 4,
  });

  const promise = client.connect();

  if (process.env.NODE_ENV !== "production") {
    global.__mongoClientPromise = promise;
  }

  return promise;
}

export function hasMongoConfig() {
  return Boolean(mongoUri);
}

export async function getMongoDb(): Promise<Db> {
  if (!clientPromise) {
    clientPromise = createClientPromise();
  }

  try {
    const connectedClient = await clientPromise;
    return connectedClient.db(dbName);
  } catch (error) {
    clientPromise = undefined;
    if (process.env.NODE_ENV !== "production") {
      global.__mongoClientPromise = undefined;
    }
    throw error;
  }
}
