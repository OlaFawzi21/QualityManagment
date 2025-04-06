import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsiteService {
  private readonly _HttpClient = inject(HttpClient);

  getMainPageIntro(): Observable<HttpResponse<any>> {
    return this._HttpClient.get<HttpResponse<any>>(
      `Page/get-main-page-intro2`,
      {
        observe: 'response',
      }
    );
  }

  updateMainPageIntro(body: any): Observable<any> {
    return this._HttpClient.put(`Page/update-main-page-intro`, body);
  }

  deleteMainPageIntro(id: any): Observable<any> {
    return this._HttpClient.delete(
      `Page/delete-main-page-intro-by-id?id=${id}`,
      {}
    );
  }

  getDownloadappInfo(): Observable<HttpResponse<any>> {
    return this._HttpClient.get<HttpResponse<any>>(
      `Page/get-downloadapp-info`,
      {
        observe: 'response',
      }
    );
  }

  updateDownLoadappInfo(body: any): Observable<any> {
    return this._HttpClient.put(`Page/update-downloadapp-info`, body);
  }
}
