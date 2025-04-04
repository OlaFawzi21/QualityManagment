import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ActivityService } from 'src/app/_metronic/layout/core/services/web-managment/activity.service';
import { EventService } from 'src/app/_metronic/layout/core/services/web-managment/event.service';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent {
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  @ViewChild('successSwal') successSwal: SwalComponent;
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  };
  private readonly _ActivityService = inject(ActivityService);
  private readonly _EventService = inject(EventService);
  private readonly cdr = inject(ChangeDetectorRef);
  attractionPlaces: any[] = [];
  first: number = 0;
  rows: number = 10;
  id: number;
  totalRecords: number = 0;
  ngOnInit() {
    this.getAllAttractionPlaces();
  }
  getAllAttractionPlaces() {
    const param = {
      PageIndex: Math.floor(this.first / this.rows) + 1,
      PageSize: this.rows,
    };
    this._ActivityService.getAllAttractionPlaces(param).subscribe({
      next: (res: any) => {
        this.attractionPlaces = res.body.data;
        const xPagination = res.headers.get('x-pagination');
        if (xPagination) {
          const paginationData = JSON.parse(xPagination);
          this.totalRecords = paginationData.TotalCount;
        }
        this.cdr.detectChanges();
      },
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.getAllAttractionPlaces();
  }

  openDelete(event: any) {
    this.id = event;
    this.deleteSwal.fire();
  }

  triggerDelete() {
    this._ActivityService.deleteActivity(this.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.successSwal.fire().then(() => {
          this.getAllAttractionPlaces();
        });
      },
      error: () => {},
    });
  }
}
