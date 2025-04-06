import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root',
})
export class GeneratePdfService {
  constructor(private http: HttpClient) {}

  downloadFile(url: any, fileName: any, fileExtension?: any) {
    if (url) {
      saveAs(
        url,
        fileName.includes('.')
          ? fileName
          : fileName +
              '.' +
              (fileExtension ? fileExtension : url.split('.').pop())
      );
    } else {
      // headers: { "Ocp-Apim-Subscription-Key": environment.OcpApimSubscriptionKey }
      this.http.get(url, { responseType: 'blob' }).subscribe((fileResult) => {
        const file = new Blob([fileResult], { type: fileResult.type });
        saveAs(
          file,
          fileName.includes('.')
            ? fileName
            : fileName +
                '.' +
                (fileExtension ? fileExtension : url.split('.').pop())
        );
      });
    }
  }

  dwonloadWithAuth(file: any, fileType: any) {
    if (!file?.file) {
      console.error('Invalid file data:', file);
      return;
    }

    let linkSource;
    if (fileType === 'pdf') {
      linkSource = 'data:application/pdf;base64,' + file.file;
    } else if (fileType === 'excel') {
      linkSource =
        'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
        file.file;
    } else {
      console.error('Unsupported file type:', fileType);
      return;
    }

    const downloadLink: HTMLAnchorElement = document.createElement('a');
    const fileName = file.fileName || 'downloaded_file';
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  dwonloadBase64(file: any, fileType: any) {
    let linkSource;
    if (fileType === 'pdf') {
      linkSource = 'data:application/pdf;base64,' + file;
    } else if (fileType === 'excel') {
      linkSource =
        'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
        file;
    }
    const downloadLink: any = document.createElement('a') as HTMLElement;
    const fileName = 'تقارير';
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  //data:image/png;base64,

  transferIntoBase64(text: any) {
    return 'xYzDEfhsBy' + btoa(text) + 'FvW';
  }
}
