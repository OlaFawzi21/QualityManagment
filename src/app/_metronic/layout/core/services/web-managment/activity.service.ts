import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly _HttpClient = inject(HttpClient);

  getAllAttractionPlaces(param: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(param)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`AttractionPlaces/get-all-attraction-places`, {
      params,
      observe: 'response',
    });
  }

  getActivity(id: any): Observable<any> {
    return this._HttpClient.get<any>(
      `AttractionPlaces/get-attraction-place-by-id/${id}`
    );
  }

  createActivity(data: any): Observable<any> {
    return this._HttpClient.post(
      `AttractionPlaces/create-attraction-place`,
      data
    );
  }

  updateActivity(data: any): Observable<any> {
    return this._HttpClient.put(
      `AttractionPlaces/update-attraction-place`,
      data
    );
  }

  deleteActivity(id: number): Observable<any> {
    return this._HttpClient.delete(
      `AttractionPlaces/delete-attraction-place/${id}`
    );
  }
}
