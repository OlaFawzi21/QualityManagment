import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { GeneratePdfService } from 'src/app/_metronic/layout/core/services/reports/generate-pdf.service';

@Component({
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  styleUrl: './job-titles.component.scss',
})
export class JobTitlesComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _GeneratePdfService = inject(GeneratePdfService);

  isLoading = false;

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 10;

  jobTitles: any[] = [];
  title: string = 'المسميات الوظيفية';

  management = [
    { name: 'اسم الاداره', id: 1 },
    { name: 'اسم الاداره', id: 2 },
  ];
  department = [
    { name: 'اسم القسم', id: 1 },
    { name: 'اسم القسم', id: 2 },
  ];

  selectedManagement: any;
  selectedDepartment: any;

  constructor() {}

  ngOnInit() {
    this.getJobTitles();
  }

  getJobTitles() {
    const param = {
      PageIndex: Math.floor(this.first / this.rows) + 1,
      PageSize: this.rows,
    };
    // this._service.fun(param).subscribe({
    //   next: (res) => {
    //     this.jobTitles = res.body.data || [];
    //     const xPagination = res.headers.get('x-pagination');
    //     if (xPagination) {
    //       const paginationData = JSON.parse(xPagination);
    //       this.totalRecords = paginationData.TotalCount;
    //     }
    //     this.cdr.detectChanges();
    //   }
    // });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

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

  ngOnDestroy(): void {}
}
