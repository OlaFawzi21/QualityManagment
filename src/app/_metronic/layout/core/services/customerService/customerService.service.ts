import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  private readonly _HttpClient = inject(HttpClient);

  getAll(param: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(param)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`Tickets/get-all-tickets`, {
      params,
      observe: 'response',
    });
  }

  getDetails(id: any): Observable<any> {
    return this._HttpClient.get<any>(`Tickets/get-ticket-by-id`, {
      params: { id: id },
    });
  }

  updateTicket(data: any): Observable<any> {
    return this._HttpClient.put(`Tickets/close-ticket`, data);
  }

  deleteTicket(id: number): Observable<any> {
    return this._HttpClient.delete(`Tickets/DeleteTicket`, {
      params: { id: id },
    });
  }
}
