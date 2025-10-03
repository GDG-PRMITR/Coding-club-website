export { PastEventCard } from './PastEventCard';
export { UpcomingEventCard } from './UpcomingEventCard';
export { EventFilter } from './EventFilter';
export { EventDetailModal } from './EventDetailModal';

export type {
  Event,
  PastEvent,
  UpcomingEvent,
  EventFilters,
  Organization,
  EventStatus,
  EventCategory,
  Venue,
  EventImage,
  Speaker
} from '@/lib/types/events';

export {
  isPastEvent,
  isUpcomingEvent,
  ORGANIZATIONS,
  EVENT_CATEGORIES
} from '@/lib/types/events';

export {
  mockEvents,
  getEventsByOrganization,
  getEventsByStatus,
  getPastEvents,
  getUpcomingEvents,
  searchEvents
} from '@/lib/data/mockEvents';