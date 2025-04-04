import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransportationService {
  private readonly _HttpClient = inject(HttpClient);

  getTrans(param: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(param)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`Transportation/get-all-transportations`, {
      params,
      observe: 'response',
    });
  }

  getTran(id: any): Observable<any> {
    return this._HttpClient.get<any>(
      `Transportation/get-transportation/${id}`
    );
  }

  createTran(data: any): Observable<any> {
    return this._HttpClient.post(`Transportation/create-transportaion`, data);
  }

  updateTran(data: any): Observable<any> {
    return this._HttpClient.put(`Transportation/update-transportation`, data);
  }

  deleteTran(id: number): Observable<any> {
    return this._HttpClient.delete(
      `Transportation/delete-transportation/${id}`
    );
  }
}
