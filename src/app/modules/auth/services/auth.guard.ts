import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this.authService.currentUserValue;
    // if (currentUser) {
    //   // logged in so return true
    //   return true;
    // }
    // const router = inject(Router);

    if (localStorage.getItem('accessToken') !== null) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }

    // not logged in so redirect to login page with the return url
    // this.authService.logout();
    // return false;
  }
}
