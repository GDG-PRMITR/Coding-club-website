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
  tags: string[];
  date: string;
  endDate?: string;
  time: string;
  location: string;
  organizers: string[];
  domain: string;
  club: string;
  eventType: EventType;
  registrationLink?: string;
}

export const events: Event[] = [
  {
    id: "ccna-bootcamp",
    title: "CCNA 1 - 2024 WorkShop",
    description: "7+ Days Training Workshop-subnetting,and routing fundamentals. Includes guided labs and take-home mini-labs.",
    tags: ["CCNA", "Routing & Switching", "Official Certificate"],
    date: "2024-12-12",
    time: "10:00–16:00",
    location: "CSE DEPT ,PRMITR ",
    organizers: ["Deep Singnapure", "Vedant Himte", "Rahul Kharap"],
    domain: "cloud",
    club: "cisco",
    eventType: "Workshop",
    registrationLink: "https://forms.gle/PU3qw96SJM2qLqwW8",
  },
  {
    id: "packer-bootcamp",
    title: "Packet Tracer WorkShop",
    description: "Complete Packet Tracer Fast-track IPv4/IPv6, subnetting, VLANs. Includes guided labs and take-home mini-labs.",
    tags: ["Packet Tracer", "CCNA", "Routing & Switching", "Official Certificate"],
    date: "2024-09-10",
    time: "10:00–16:00",
    location: "CSE DEPT ,PRMITR ",
    organizers: ["Jay Jadhao", "Riddhi Akhare"],
    domain: "cloud",
    club: "cisco",
    eventType: "Workshop",
    registrationLink: "https://forms.gle/Dqqqza3DRKcoXbTP6",
  },
  {
    id: "dsa-25-sept",
    title: "DSA Contest Sept",
    description: "1Solve challenging problems on arrays, trees, algorithms. Beginner to advanced levels, leaderboard live.",
    tags: ["Algorithms", "Data Structures", "Competitive Programming"],
    date: "2025-09-19",
    time: "09:00–11:00",
    location: "CSE Dept, PRMITR",
    organizers: ["Gunjan Pachpohar", "Apurva Kadu"],
    domain: "dsa",
    club: "cisco",
    eventType: "Competition",
    registrationLink: "https://forms.gle/iKf5F3VPYLtYLMry9",
  },
  {
    id: "dsa-25-oct",
    title: "DSA Contest Oct",
    description: "2nd Contest - Solve challenging problems on arrays, algorithms. Beginner to advanced levels, leaderboard live.",
    tags: ["Algorithms", "Data Structures", "Competitive Programming"],
    date: "2025-10-19",
    time: "09:00–11:00",
    location: "CSE Dept, PRMITR",
    organizers: ["Vedant Himte", "Apurva Kadu", "Anushka Vishwakarma"],
    domain: "dsa",
    club: "cisco",
    eventType: "Competition",
    registrationLink: "https://forms.gle/tiQ7AymDPm7Qtevz9",
  },
  {
    id: "cyber-security",
    title: "Cyber Security Workshop",
    description: "Learn core concepts of Linux, Pentesting and explore how modern enterprises design secure access solutions.",
    tags: ["Ethical Hacking", "Live Attack Perform", "Data Privacy"],
    date: "2025-09-08",
    time: "11:00–13:00",
    location: "CSE Dept, PRMITR",
    organizers: ["Harsh Verma", "Shreya Patil"],
    domain: "dsa",
    club: "cisco",
    eventType: "Workshop",
  },
  {
    id: "orientation-program-25",
    title: "Orientation Program '25",
    description: "Know about PRMITR CISCO NETWORKING ACADEMY, last year achievements, felicitation, courses, future scope.",
    tags: ["Know About Cisco", "Plan Of Action", "Certification"],
    date: "2025-09-15",
    time: "11:00–13:00",
    location: "Extc Dept, PRMITR",
    organizers: ["Rahul Kharap", "Meera Kapoor"],
    domain: "community",
    club: "cisco",
    eventType: "Meetup",
  },
  {
    id: "ai-masterclass",
    title: "AI Masterclass",
    description: "Dive into the world of Artificial Intelligence and Machine Learning. Explore real-world applications, AI while ensuring data privacy and security.",
    tags: ["Artificial Intelligence", "Machine Learning", "Data Privacy"],
    date: "2025-09-18",
    time: "09:00–11:00",
    location: "CSE Dept, PRMITR",
    organizers: ["Harsh Verma", "Amandeep Singh"],
    domain: "ai-ml",
    club: "cisco",
    eventType: "Workshop",
  },
  {
    id: "ccna1-bootcamp-2025",
    title: "CCNA 1 WorkShop '25",
    description: "7+ Days Training Workshop-subnetting,and routing fundamentals. Includes guided labs and take-home mini-labs.",
    tags: ["CCNA", "Routing & Switching", "Official Certificate"],
    date: "2025-10-06",
    time: "09:00–11:00",
    location: "CSE DEPT ,PRMITR ",
    organizers: ["Gunjan Pachpohar", "Yash Phalke"],
    domain: "cloud",
    club: "cisco",
    eventType: "Workshop",
  },
  {
    id: "ccna1-bootcamp-2026",
    title: "CCNA 1 WorkShop '26",
    description: "Training Workshop-subnetting,and routing fundamentals. Includes guided labs and take-home mini-labs.",
    tags: ["CCNA", "Routing & Switching", "Official Certificate"],
    date: "2026-02-23",
    time: "09:00–11:00",
    location: "CSE DEPT ,PRMITR ",
    organizers: ["Atharv Borkar", "Vedavati Joshi"],
    domain: "cloud",
    club: "cisco",
    eventType: "Workshop",
    registrationLink: "https://forms.gle/tiQ7AymDPm7Qtevz9",
  },
  {
    id: "cyber-security-1-26",
    title: "Cyber Security Drill",
    description: "Learn core concepts of Linux, Pentesting and explore how modern enterprises design secure access solutions.",
    tags: ["Ethical Hacking", "Live Attack Perform", "Data Privacy"],
    date: "2026-03-10",
    time: "09:00–11:00",
    location: "CSE Dept, PRMITR",
    organizers: ["Apurva Kadu", "Rishi Jain"],
    domain: "dsa",
    club: "cisco",
    eventType: "Workshop",
  },
  {
    id: "web-dev-1-26",
    title: "Web Storm",
    description: "Learn core concepts of Linux, Pentesting and explore how modern enterprises design secure access solutions.",
    tags: ["MERN", "Web Development", "AI Workflow"],
    date: "2026-03-23",
    time: "09:30–11:00",
    location: "CSE Dept, PRMITR",
    organizers: ["Rahul Kharap", "Vikas Kumar"],
    domain: "web-dev",
    club: "cisco",
    eventType: "Workshop",
    registrationLink: "https://forms.gle/Dqqqza3DRKcoXbTP6",
  },
  {
    id: "ccna2-bootcamp-2026",
    title: "CCNA 2 Workshop '26",
    description: "CNA 2 workshop on switching technologies and network infrastructure, VLAN configuration, STP.",
    tags: ["Switching", "Inter-VLAN Routing", "EtherChannel"],
    date: "2026-03-30",
    time: "09:00–11:00",
    location: "CSE Dept, PRMITR",
    organizers: ["Rahul Kharap", "Pooja Srivastava"],
    domain: "cloud",
    club: "cisco",
    eventType: "Workshop",
    registrationLink: "https://forms.gle/PU3qw96SJM2qLqwW8",
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
