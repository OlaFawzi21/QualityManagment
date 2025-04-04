import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  login(data: any) {
    return this._HttpClient.post(`Auth/login`, data);
  }

  refreshToken(data: any) {
    return this._HttpClient.post(`Auth/refresh-token`, data);
  }

  saveUserData(response: any): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem(
      'accessTokenExpirationDate',
      response.accessTokenExpirationDate
    );
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem(
      'refreshTokenExpirationDate',
      response.refreshTokenExpirationDate
    );
    localStorage.setItem('userRole', response.roles[0]);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpirationDate');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpirationDate');
    localStorage.removeItem('userRole');
    return this._HttpClient.post(`Auth/logout`, {});
  }

  navigate(): void {
    localStorage.clear();
    this._Router.navigate(['/auth/login']);
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
  redirectUserBasedOnRole(): void {
    this._Router.navigate(['auth/login']);
    const userRole = this.getUserRole();
    if (!userRole) {
      this.logOut();
      return;
    }
    switch (userRole) {
      case 'Admin':
        this._Router.navigate(['/dashboard']);
        break;
      case 'Manager':
        this._Router.navigate(['/heritage/dashboard']);
        break;
      default:
        this.logOut(); // Log out if role is unrecognized
    }
  }
}
