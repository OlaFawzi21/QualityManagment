import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly _HttpClient = inject(HttpClient);

  getAllEvents(param: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(param)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`Event/get-all-events`, {
      params,
      observe: 'response',
    });
  }
  getLastFiveEvent(): Observable<any> {
    return this._HttpClient.get<any>(`Event/get-last-five-created`);
  }

  getEvent(id: any): Observable<any> {
    return this._HttpClient.get<any>(`Event/get-event/${id}`);
  }

  createEvent(data: any): Observable<any> {
    return this._HttpClient.post(`Event/create-event`, data);
  }

  updateEvent(data: any): Observable<any> {
    return this._HttpClient.put(`Event/update-event`, data);
  }

  deleteEvent(id: number): Observable<any> {
    return this._HttpClient.delete(`Event/delete-event/${id}`);
  }
}
