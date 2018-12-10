import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../models/place';
import { Url } from '../../config/config';
import 'rxjs/add/operator/map';
import { Address } from 'cluster';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private placesUrl = `${Url}/places`;
  private placeURL = `${Url}/add-places`;
  private API_URL = `https://maps.googleapis.com/maps/api/geocode/json?&latlng=`
  private API_KEY = 'AIzaSyDxQbTBXM8Jr7bZZPPnVeK9Oe-hzO30Nbc';

  constructor(private http: HttpClient) {
    this.API_KEY = 'AIzaSyDxQbTBXM8Jr7bZZPPnVeK9Oe-hzO30Nbc'
  }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${Url}/places`);
  }

  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${Url}/places/${id}`);
  }

  getPlacesForHomePage(): Observable<Place[]> {
    return this.http.get<Place[]>(`${Url}/places/short-info`);
  }
  addPlace(newPlace: Place): Observable<{}> {
    return this.http.post(`${Url}/add-places`, newPlace);
  }
  deletePlace(id: any): Observable<Place> {
    console.log('from service ' + id);
    console.log(`${Url}/delete-place/${id}`);
    return this.http.delete<Place>(`${Url}/delete-place/${id}`);
  }
}
