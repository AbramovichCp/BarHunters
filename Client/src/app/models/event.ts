import { Place } from '../models/place';
import { Artist } from '../models/artist';

export class Event {
  event_id: number;
  event_title: string;
  place_id: Place;
  event_poster: string;
  manager_id: number;
  artists: Artist[];
  event_about: string;
  event_date: Date;
  event_type: string;

  constructor(event_type: string) {
    this.event_type = event_type;
  }
}

export class Implicit {
  response: Event[];
  page: number;
  totalPages: number;
  totalEvents: number;
}
