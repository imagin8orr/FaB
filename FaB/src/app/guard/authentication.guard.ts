import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  redirectUrl: any;
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    if (typeof localStorage.currentUser != 'undefined') {
      if (url.includes("/login")) {
        const userRole = JSON.parse(localStorage.currentUser);
        console.log(userRole, 'in userRole');
        if (userRole.user_type) {
          this.redirectUrl = "/my-cards";
        } else {
          this.redirectUrl = '/';
          localStorage.removeItem('access_token');
          localStorage.removeItem('currentUser');
        }
        this.router.navigate([this.redirectUrl]);
      }
      return true;
    }
    if (url.includes("/login")) {
      return true;
    }
    this.router.navigate(['/']);
    return true;
  }

}
