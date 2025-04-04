import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-heritage-all-reports',
  templateUrl: './heritage-all-reports.component.html',
  styleUrl: './heritage-all-reports.component.scss',
})
export class HeritageAllReportsComponent {
  reports: any[] = [
    {
      name: 'نسبه زياره الهنود',
      type: 'التقارير الأمنية وسلامة الزوار',
    },
    {
      name: 'صفحات جذب المستخدمين',
      type: 'التقارير الأمنية وسلامة الزوار',
    },
    {
      name: 'الاماكن الاكثر زياره في فبراير',
      type: 'التقارير الأمنية وسلامة الزوار',
    },
  ];
  param: any;

  first: number = 1;
  rows: number = 10;

  id: string;

  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  @ViewChild('successSwal') successSwal: SwalComponent;

  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  };

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  getReports() {}

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.getReports();
  }

  openDeleteSwal(id: string) {
    this.deleteSwal.fire();
    this.id = id;
  }

  triggerDelete() {
    this.successSwal.fire();
  }
}
