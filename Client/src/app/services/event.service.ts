import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event, Implicit } from '../models/event';
import { Url } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsUrl = `${Url}/events`; // URL to web api
  constructor(private http: HttpClient) { }

  getPremiumEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/top`);
  }

  getUpcomingEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/upcoming-events`);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}`);
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.eventsUrl}/${id}`);
  }

  getSortedAllEvents(page: number): Observable<Implicit> {
    return this.http.get<Implicit>(`${Url}/all-events/${page}`);
  }

  getEventsByPlaceId(id: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${Url}/places/${id}/events`);
  }
  search(searchQuery: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/search/${searchQuery}`);
  }

}
