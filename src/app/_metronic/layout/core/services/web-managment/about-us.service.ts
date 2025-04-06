import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  private readonly _HttpClient = inject(HttpClient);

  getAboutHail(): Observable<HttpResponse<any>> {
    return this._HttpClient.get<HttpResponse<any>>(`Page/get-about-hail`, {
      observe: 'response',
    });
  }
  updateAboutHail(body: any): Observable<any> {
    return this._HttpClient.put(`Page/update-about-hail`, body);
  }
  getMainVideo(): Observable<HttpResponse<any>> {
    return this._HttpClient.get<HttpResponse<any>>(`Page/get-video-intro`, {
      observe: 'response',
    });
  }
  updateMainVideo(body: any): Observable<any> {
    return this._HttpClient.put(`Page/update-video-intro?video=${body}`, {});
  }
}
