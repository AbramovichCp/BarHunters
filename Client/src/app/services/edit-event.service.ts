import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event';
import {Url} from "../../config/config";
@Injectable({
  providedIn: 'root'
})
export class EditEventService {
  private eventsUrl = `${Url}`; // URL to web api
  constructor( private http: HttpClient) { }
  getEvents() {
    return this.http.get(`${this.eventsUrl}/getEventsForDelete`)
  }
  getMergedEvents(token): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/getEventsForDelete/${token}`)
  }
  deleteEvent(token): Observable<any> {
    return this.http.post(`${this.eventsUrl}/deleteEvent`, token);
  }
  updateImg(image):Observable<any> {
    return this.http.post(`${this.eventsUrl}/uploadImg`, image);
  }
  updateEvent(textData):Observable<any> {
    return this.http.post(`${this.eventsUrl}/updateEvent`, textData);
  }
  getEventsForEdit(token):Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/getEventsForEdit/${token}`)
  }
}
