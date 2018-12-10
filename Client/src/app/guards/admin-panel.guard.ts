import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminPanelGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    if (this.auth.isAuthenticated()) {
      if (jwt_decode( this.auth.getAccessToken() ).role === 'manager' ||
          jwt_decode( this.auth.getAccessToken() ).role === 'admin') { return of(true); }
    } else {
      this.router.navigate(['/BarsHunters/home-page']);
      return of(false);
    }

  }

}
