import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisitorsService {
  private readonly _HttpClient = inject(HttpClient);
  getvisitorsSummary(body: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(body)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`Reports/visitors-summary`, {
      params,
      observe: 'response',
    });
  }
  getseasonalVisitCounts(body: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(body)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`Reports/seasonal-visit-counts`, {
      params,
      observe: 'response',
    });
  }
  getHeritageSitesVisitors(body: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(body)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`Reports/heritage-site-visitors`, {
      params,
      observe: 'response',
    });
  }
  heritageSitesVisitorsReport(body: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(body)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`PdfReports/heritage-site-visits-pdf-report`, {
      params,
      observe: 'response',
    });
  }
  getHeritageSitesWithReviews(body: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(body)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`Reports/heritage-sites-with-reviews`, {
      params,
      observe: 'response',
    });
  }
}
