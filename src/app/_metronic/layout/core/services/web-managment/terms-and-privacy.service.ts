import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TermsAndPrivacyService {
  private readonly _HttpClient = inject(HttpClient);

  getAllTermsAndPrivacy(): Observable<HttpResponse<any>> {
    return this._HttpClient.get<HttpResponse<any>>(`Terms/localized-term`, {
      observe: 'response',
    });
  }
  createTermsAndPrivacy(body: any): Observable<any> {
    return this._HttpClient.post(`Terms/Add-terms`, body);
  }
  updateTermsAndPrivacy(body: any): Observable<any> {
    return this._HttpClient.put(`Terms/update-term`, body);
  }
  deleteTermsAndPrivacy(id: any): Observable<any> {
    return this._HttpClient.delete(`Terms/delete-term`, {
      params: {
        id: id,
      },
    });
  }
}
