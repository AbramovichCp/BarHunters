import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          'Authorization': this.auth.getAccessToken()
        }
      });
    }

    return next
      .handle(req)
      .pipe(
        tap((res: HttpEvent<any>) => {
          if (res instanceof HttpResponse && res.body.accessToken) {
            this.auth.setAccessToken(res.body.accessToken);
          }
        }),
        catchError(res => {
          if (res instanceof HttpErrorResponse && res.status === 401) {
            this.auth.logout();
          }
          return throwError(res);
        })
      );

  }
}
