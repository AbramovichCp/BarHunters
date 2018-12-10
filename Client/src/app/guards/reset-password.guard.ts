import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.checkToken( route.queryParams['token'] );

  }

  checkToken(token): Observable<boolean>  {

    const tokenExists: boolean = token ? true : false;
    if (tokenExists) { return of(tokenExists); }

    this.router.navigate(['/BarsHunters']);
    return of(tokenExists);
  }

}
