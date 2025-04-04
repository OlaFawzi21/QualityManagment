import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  private readonly _HttpClient = inject(HttpClient);

  getAllMaps(body: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(body)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`MapsAndPlaces/maps-and-places`, {
      params,
      observe: 'response',
    });
  }
  createMapsAndPlaces(body: any): Observable<any> {
    return this._HttpClient.post(`MapsAndPlaces/maps-and-places`, body);
  }
}
