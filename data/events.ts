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

];

export const eventTypes: EventType[] = [
  "Workshop",
  "Hackathon",
  "Meetup",
  "Webinar",
  "Competition",
  "Social",
];
