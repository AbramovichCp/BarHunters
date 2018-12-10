import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Manager } from '../models/managers';
import { Url } from '../../config/config';
@Injectable({
  providedIn: 'root',
})
export class ManagerService {

  constructor(private http: HttpClient) {}

  addManager(newManager: Manager): Observable<{}> {
    return this.http.post(`${Url}/add-manager`, newManager);
  }
}
