// Event types and interfaces for the Events page

export type Organization = 'GDG' | 'GSA' | 'Coding Club';

export type EventStatus = 'past' | 'upcoming';

export type EventCategory = 'workshop' | 'hackathon' | 'conference' | 'meetup' | 'seminar' | 'competition';

export interface Venue {
  name: string;
  address: string;
  city: string;
  isOnline?: boolean;
  meetingLink?: string;
}

export interface EventImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Speaker {
  name: string;
  designation: string;
  company?: string;
  image?: string;
  bio?: string;
}

export interface BaseEvent {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  organization: Organization;
  category: EventCategory;
  venue: Venue;
  image: EventImage;
  keywords: string[];
  speakers?: Speaker[];
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface PastEvent extends BaseEvent {
  status: 'past';
  date: string; // ISO date string
  duration: number; // duration in hours
  attendeeCount?: number;
  gallery?: EventImage[];
  highlights?: string[];
  feedback?: {
    rating: number;
    totalResponses: number;
  };
  resources?: {
    presentation?: string;
    code?: string;
    recording?: string;
  };
}

export interface UpcomingEvent extends BaseEvent {
  status: 'upcoming';
  date: string; // ISO date string
  endDate?: string; // For multi-day events
  registrationUrl: string;
  registrationDeadline?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  prerequisites?: string[];
  agenda?: {
    time: string;
    activity: string;
    speaker?: string;
  }[];
  price?: {
    amount: number;
    currency: string;
    earlyBird?: {
      amount: number;
      deadline: string;
    };
  };
}

export type Event = PastEvent | UpcomingEvent;

export interface EventFilters {
  organization: Organization | 'All';
  status: EventStatus | 'All';
  category?: EventCategory | 'All';
  search?: string;
}

export interface EventsPageProps {
  events: Event[];
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
}

// Utility type guards
export const isPastEvent = (event: Event): event is PastEvent => {
  return event.status === 'past';
};

export const isUpcomingEvent = (event: Event): event is UpcomingEvent => {
  return event.status === 'upcoming';
};

// Organization configuration
export const ORGANIZATIONS = {
  'GDG': {
    name: 'Google Developer Groups',
    shortName: 'GDG',
    color: '#4285F4', // Google Blue
    logo: '/gdg-logo.png'
  },
  'GSA': {
    name: 'Google Student Ambassador',
    shortName: 'GSA',
    color: '#34A853', // Google Green
    logo: '/gsa-logo.png'
  },
  'Coding Club': {
    name: 'Coding Club',
    shortName: 'Coding Club',
    color: '#EA4335', // Google Red
    logo: '/coding-club-logo.png'
  }
} as const;

export const EVENT_CATEGORIES = {
  workshop: { name: 'Workshop', icon: '🔧' },
  hackathon: { name: 'Hackathon', icon: '💻' },
  conference: { name: 'Conference', icon: '🎤' },
  meetup: { name: 'Meetup', icon: '👥' },
  seminar: { name: 'Seminar', icon: '📚' },
  competition: { name: 'Competition', icon: '🏆' }
} as const;