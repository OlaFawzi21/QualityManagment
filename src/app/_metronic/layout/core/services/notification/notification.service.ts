import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}

  getLatestNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}Notifications/last-notifications`).pipe(
      catchError((err) => {
        console.error('Error fetching notifications:', err);
        throw err;
      })
    );
  }

  getNotificationsPaginated(pageSize:number, pageIndex:number){
    return this.http.get<any[]>(`${environment.baseUrl}Notifications/notifications`, {params: {pageSize, pageIndex}}).pipe(
      catchError((err) => {
        console.error('Error fetching notifications:', err);
        throw err;
      })
    );
  }
}
