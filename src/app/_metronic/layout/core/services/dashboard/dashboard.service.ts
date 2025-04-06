import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly _HttpClient = inject(HttpClient);
  getMostVisitedNationalities(): Observable<any> {
    return this._HttpClient.get<any>(`Users/get-most-visited-nationalities`);
  }
  getUsersCountByRegion(): Observable<any> {
    return this._HttpClient.get<any>(`Users/get-users-count-by-region`);
  }

  getStatisticsForChart(param: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(param)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`Users/get-users-statistics-for-chart`, {
      params,
      observe: 'response',
    });
  }

  getMostHeritagePlaces(id: number): Observable<any> {
    return this._HttpClient.get<any>(
      `HeritageSites/get-most-visited-heritage-sites`,
      { params: { governateId: id } }
    );
  }

  getNation(): Observable<any> {
    return this._HttpClient.get<any>(`Countries/nationalities`);
  }
}
