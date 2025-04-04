import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private readonly _HttpClient = inject(HttpClient);

  getAllPlaces(body: any): Observable<HttpResponse<any>> {
    // Filter out null, undefined, and empty values
    const params = new HttpParams({
      fromObject: Object.entries(body)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`HeritageSites/heritage-sites`, {
      params,
      observe: 'response',
    });
  }

  getPlace(id: any): Observable<HttpResponse<any>> {
    return this._HttpClient.get<HttpResponse<any>>(
      `HeritageSites/heritage-sites/${id}`
    );
  }

  transDropDown(): Observable<any> {
    return this._HttpClient.get<any>(
      `Transportation/get-transportation-drop-down`
    );
  }

  airportsDropDown(): Observable<any> {
    return this._HttpClient.get<any>(`Transportation/get-airports-drop-down`);
  }

  attractionsDropDown(): Observable<any> {
    return this._HttpClient.get<any>(
      `Transportation/get-attractions-drop-down`
    );
  }

  governmentsDropDown(): Observable<any> {
    return this._HttpClient.get<any>(`Governates/governates-drop-down`);
  }

  getPlaceLocalization(id: any): Observable<HttpResponse<any>> {
    return this._HttpClient.get<HttpResponse<any>>(
      `HeritageSites/localized-heritage-sites/${id}`
    );
  }

  getSafety(): Observable<HttpResponse<any>> {
    return this._HttpClient.get<HttpResponse<any>>(
      `HeritageSites/safety-informations`
    );
  }

  updatePlace(body: any): Observable<any> {
    return this._HttpClient.put(`HeritageSites/heritage-sites`, body);
  }

  addPlace(body: any): Observable<any> {
    return this._HttpClient.post(`HeritageSites/heritage-sites`, body);
  }

  deletePlace(id: any): Observable<any> {
    return this._HttpClient.delete(`HeritageSites/heritage-sites/${id}`);
  }
}
