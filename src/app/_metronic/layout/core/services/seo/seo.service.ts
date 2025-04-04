import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly _HttpClient = inject(HttpClient);
  getSeoInformation(): Observable<any> {
    return this._HttpClient.get(`SeoInformation/get-seo-settings`);
  }

  updateSeoInformation(body: any): Observable<any> {
    return this._HttpClient.put(`SeoInformation/update-seo-settings`, body);
  }
}
