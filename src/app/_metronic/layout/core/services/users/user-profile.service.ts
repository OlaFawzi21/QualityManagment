import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly _HttpClient = inject(HttpClient);
  getProfileInfo(): Observable<any> {
    return this._HttpClient.get(`Users/get-admin-information`);
  }

  updateProfileInfo(body: any): Observable<any> {
    return this._HttpClient.put(`Users/update-admin-information`, body);
  }

  changePassword(body: any): Observable<any> {
    return this._HttpClient.put(`Auth/change-password`, body);
  }
}
