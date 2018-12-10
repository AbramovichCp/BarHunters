import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserActionService {
  constructor(private http: HttpClient) {}

  sendRegistrationData(user: any) {
    return this.http.post('http://localhost:8080/api/register', user);
  }

  confirmEmail(token: string) {
    return this.http.post('http://localhost:8080/api/confirm-email', {token: token});
  }

  forgotPassword(user: any) {
    return this.http.post('http://localhost:8080/api/forgot-password', user);
  }

  resetPassword(newPassword: any) {
    return this.http.post('http://localhost:8080/api/reset-password', newPassword);
  }

  exampleRoute() {
    return this.http.post('http://localhost:8080/api/example-route', {});
  }
}
