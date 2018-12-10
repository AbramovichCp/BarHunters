import { Injectable } from '@angular/core';
import { DataModel } from '../models/dataModel';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Url } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AddEventService {
  private eventsUrl = `${Url}`; // URL to web api
  constructor(private http: HttpClient) {}

  getArtists(): Observable<any> {
    return this.http.get<DataModel[]>(`${this.eventsUrl}/getArtists`);
  }
  getPlaces(): Observable<any> {
    return this.http.get<DataModel[]>(`${this.eventsUrl}/getPlacesByIdName`);
  }
  getManagersIdPlaces(): Observable<any> {
    return this.http.get<DataModel[]>(`${this.eventsUrl}/getManagersIdPlaces`);
  }
  createEventUploadImage(image): Observable<any> {
    return this.http.post(`${this.eventsUrl}/uploadImg`, image);
  }
  createEvent(textData): Observable<any> {
    return this.http.post(`${this.eventsUrl}/createEvent`, textData);
  }
}
