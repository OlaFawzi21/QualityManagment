import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private readonly _HttpClient = inject(HttpClient);
  uploadImage(imgPath: any, folderName: string): Observable<HttpResponse<any>> {
    return this._HttpClient.post<HttpResponse<any>>(
      `General/UploadMultipleImages?FolderName=${folderName}`,
      imgPath,
      { observe: 'response' }
    );
  }
  getFile(filePath: any) {
    return this._HttpClient.get(`General/get-file/${filePath}`);
  }
  uploadFile(FilePath: any, folderName: string): Observable<any> {
    return this._HttpClient.post<any>(
      `General/UploadFile?FolderName=${folderName}`,
      FilePath,
      { responseType: 'text' as 'json' }
    );
  }
}
