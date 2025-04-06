import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  private readonly _HttpClient = inject(HttpClient);

  getAllFAQ(): Observable<HttpResponse<any>> {
    return this._HttpClient.get<HttpResponse<any>>(`FAQ/faq-localized`, {
      observe: 'response',
    });
  }
  createFAQ(body: any): Observable<any> {
    return this._HttpClient.post(`FAQ/create-faq`, body);
  }
  updateFAQ(body: any): Observable<any> {
    return this._HttpClient.put(`FAQ/update-faq`, body);
  }
  deleteFAQ(id: any): Observable<any> {
    return this._HttpClient.delete(`FAQ/delete-faq`, {
      params: {
        id: id,
      },
    });
  }
}
