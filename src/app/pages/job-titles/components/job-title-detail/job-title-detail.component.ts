import { Component } from '@angular/core';

@Component({
  selector: 'app-job-title-detail',
  templateUrl: './job-title-detail.component.html',
  styleUrl: './job-title-detail.component.scss',
})
export class JobTitleDetailComponent {
  exportPDF() {
    // this._UsersService.userActivityReport().subscribe(
    //   (res: any) => {
    //     console.log('API Response:', res);
    //     const responseBody = res.body ? res.body : res;
    //     if (responseBody?.data) {
    //       this._GeneratePdfService.dwonloadWithAuth(
    //         { file: responseBody.data, fileName: 'Tourist.pdf' },
    //         'pdf'
    //       );
    //     } else {
    //       console.error(
    //         'Invalid response format or missing file data',
    //         responseBody
    //       );
    //     }
    //   },
    //   (error) => {
    //     console.error('API Error:', error);
    //   }
    // );
  }
}
