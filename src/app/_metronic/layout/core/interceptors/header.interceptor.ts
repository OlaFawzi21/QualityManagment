import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';
import { firstValueFrom, from, switchMap } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const _LoginService = inject(LoginService);
  const baseUrl = environment.baseUrl;

  const updatedUrl = baseUrl + req.url;

  if (req.url.includes('login') || req.url.includes('refresh-token')) {
    const newRequest = req.clone({ url: updatedUrl });
    return next(newRequest);
  }

  const accessToken = localStorage.getItem('accessToken') ?? '';
  const refreshToken = localStorage.getItem('refreshToken');
  const tokenExpiry = localStorage.getItem('accessTokenExpirationDate');

  if (accessToken && refreshToken && tokenExpiry) {
    const now = new Date().getTime();
    const expiryTime = new Date(tokenExpiry).getTime();

    if (now > expiryTime) {
      const body = { token: accessToken, refreshToken: refreshToken };
      return from(firstValueFrom(_LoginService.refreshToken(body))).pipe(
        switchMap((refreshResponse: any) => {
          _LoginService.saveUserData(refreshResponse);
          const newRequest = req.clone({
            url: updatedUrl,
            setHeaders: { Authorization: `Bearer ${refreshResponse.token}` },
          });
          return next(newRequest);
        })
      );
    } else {
      const newRequest = req.clone({
        url: updatedUrl,
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
      return next(newRequest);
    }
  }

  return next(req.clone({ url: updatedUrl }));
};
