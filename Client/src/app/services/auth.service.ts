import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private cookie: CookieService,
              private router: Router) {}

  public refreshHeaderSubject = new Subject<any>();
  public showProfileSubject = new Subject<any>();

  signIn(user): Observable<{accessToken: string}> {
    return this.http.post<{accessToken: string}>('http://localhost:8080/api/signIn', user)
      .pipe(
        tap(
          ({accessToken}) => {
            this.setAccessToken(accessToken);
          }
        )
      );
  }

  refreshHeader(hide) {
    this.refreshHeaderSubject.next(hide);
  }

  showProfile(show) {
    this.showProfileSubject.next(show);
  }

  setAccessToken(accessToken: string) {
    this.cookie.set('accessToken', accessToken);
  }

  getAccessToken() {
    return this.cookie.get('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.cookie.get('accessToken');
  }

  logout() {
    this.cookie.delete('accessToken');
    localStorage.removeItem('user-events-id');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigated = false;
    this.router.navigate([`/BarsHunters/home-page`]);
    this.refreshHeader(true);
  }

}
