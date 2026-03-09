export type EventType =
  | "Workshop"
  | "Hackathon"
  | "Meetup"
  | "Webinar"
  | "Competition"
  | "Social";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizers: string[];
  domain: string;
  club: string;
  eventType: EventType;
  image?: string;
  registrationLink?: string;
  registrationOpen: boolean;
  capacity?: number;
  registered?: number;
}

export const events: Event[] = [
  {
    id: "event-001",
    title: "Getting Started with Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript in a practical workshop.",
    date: "2026-04-15",
    time: "18:00",
    location: "Lab 3, PRMITR",
    organizers: ["Ninad Vaidya", "Riya Umekar"],
    domain: "web-dev",
    club: "coding-club",
    eventType: "Workshop",
    image: "/gallery/web-dev-team.jpeg",
    registrationLink: "https://forms.google.com/",
    registrationOpen: true,
    capacity: 50,
    registered: 42,
  },
  {
    id: "event-002",
    title: "GenAI Build Sprint",
    description: "A collaborative GenAI sprint focused on prompt engineering and rapid prototyping.",
    date: "2026-05-10",
    time: "11:00",
    location: "Seminar Hall",
    organizers: ["Harshal Alaspure", "Krushna Mohod"],
    domain: "ai-ml",
    club: "gsa",
    eventType: "Competition",
    image: "/gallery/all-gdg-members-in-seminar-hall.jpeg",
    registrationOpen: true,
    capacity: 120,
    registered: 86,
  },
  {
    id: "event-003",
    title: "Cisco Networking Essentials",
    description: "Hands-on networking fundamentals using Cisco tooling and labs.",
    date: "2026-03-02",
    time: "14:00",
    location: "Network Lab",
    organizers: ["Prof. C.N. Deshmukh"],
    domain: "cloud",
    club: "cisco",
    eventType: "Workshop",
    image: "/gallery/students-attended.jpeg",
    registrationOpen: false,
  },
  {
    id: "event-004",
    title: "NVIDIA AI Talk Series",
    description: "Explore GPU computing, accelerated AI workflows, and research pathways.",
    date: "2026-06-01",
    time: "16:00",
    location: "Main Auditorium",
    organizers: ["Dr. R.R. Karwa", "Tejas Nikose"],
    domain: "ai-ml",
    club: "nvidia",
    eventType: "Meetup",
    image: "/gallery/guests-on-stage.jpeg",
    registrationOpen: true,
    registrationLink: "https://forms.google.com/",
  },
];

export const eventTypes: EventType[] = [
  "Workshop",
  "Hackathon",
  "Meetup",
  "Webinar",
  "Competition",
  "Social",
];
