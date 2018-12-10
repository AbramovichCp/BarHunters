import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../config/config';

@Injectable()
export class UserProfileService {

  constructor(private http: HttpClient) {}

  getUserEvents() {
    return this.http.get<{userEvents, accessToken}>(`${Url}/user-events`);
  }

  getPersonalInfo() {
    return this.http.get<{personalInfo}>(`${Url}/personal-info`);
  }

  editPersonalInfo(userInfo) {
    return this.http.post(`${Url}/edit-personal-info`, userInfo);
  }

}
