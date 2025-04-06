import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _HttpClient = inject(HttpClient);

  getAllUsers(param: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(param)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`Users/get-users`, {
      params,
      observe: 'response',
    });
  }

  getAllTourists(param: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(param)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(
      `Users/get-all-tourists
`,
      {
        params,
        observe: 'response',
      }
    );
  }

  getAllDataSourceEmployers(param: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(param)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`Users/get-all-data-source-employers`, {
      params,
      observe: 'response',
    });
  }

  getAllDataSources(param: any): Observable<HttpResponse<any>> {
    const params = new HttpParams({
      fromObject: Object.entries(param)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    });
    return this._HttpClient.get(`DataSource/get-all-data-sources`, {
      params,
      observe: 'response',
    });
  }

  getUserById(id: any): Observable<any> {
    return this._HttpClient.get<any>(`Users/get-user/${id}`);
  }

  getUserForUpdate(id: any): Observable<any> {
    return this._HttpClient.get<any>(`Users/get-user-for-update/${id}`);
  }

  createUser(data: any): Observable<any> {
    return this._HttpClient.post(`Users/create-user`, data);
  }

  updateUser(data: any): Observable<any> {
    return this._HttpClient.put(`Users/update-user`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this._HttpClient.delete(`Users/delete-user/${id}`);
  }

  toggleLockUser(id: number): Observable<any> {
    return this._HttpClient.put(`Users/toggle-lock-user/${id}`, {});
  }

  userActivityReport(UserId: any): Observable<any> {
    return this._HttpClient.get<any>(
      `PdfReports/user-activity-pdf-report?UserId=${UserId}`
    );
  }
}
