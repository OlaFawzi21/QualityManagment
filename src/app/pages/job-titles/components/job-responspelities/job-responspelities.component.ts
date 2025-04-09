import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/_metronic/layout/core/services/users/users.service';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { GeneratePdfService } from 'src/app/_metronic/layout/core/services/reports/generate-pdf.service';
@Component({
  selector: 'app-job-responspelities',
  templateUrl: './job-responspelities.component.html',
  styleUrl: './job-responspelities.component.scss'
})
export class JobResponspelitiesComponent {
  private readonly _UsersService = inject(UsersService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _GeneralService = inject(GeneralService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _GeneratePdfService = inject(GeneratePdfService);

  isLoading = false;

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 10;

  users: any[] = [];
  title: string = 'المستخدمين';

  status = [
    { name: 'غير نشط', value: false },
    { name: 'نشط', value: true },
  ];
  innerJob = [
    { name: 'اسم الوظيفه', id: 1 },
    { name: 'اسم الوظيفه', id: 2 },
  ];
  outerJob = [
    { name: 'اسم الوظيفه', id: 1 },
    { name: 'اسم الوظيفه', id: 2 },
  ];

  selectedManagement: any;
  selectedDepartment: any;
  selectedStatus: any;

  block = new FormControl('', Validators.required);

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const param = {
      PageIndex: Math.floor(this.first / this.rows) + 1,
      PageSize: this.rows,
    };
    // this._service.fun(param).subscribe({
    //   next: (res) => {
    //     this.licenses = res.body.data || [];
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

  openModal(modal: any) {
    this.modalService.open(modal, {
      centered: true,
    });
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

  blockUser() {}

  ngOnDestroy(): void {}

}
