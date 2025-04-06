import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { EventService } from 'src/app/_metronic/layout/core/services/web-managment/event.service';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.scss',
})
export class AllEventsComponent {
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  @ViewChild('successSwal') successSwal: SwalComponent;
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  };

  private readonly _EventService = inject(EventService);
  private readonly cdr = inject(ChangeDetectorRef);
  totalRecords: number = 0;
  events: any[] = [];
  first: number = 0;
  rows: number = 10;
  id: any;

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    const param = {
      PageIndex: Math.floor(this.first / this.rows) + 1,
      PageSize: this.rows,
    };
    this._EventService.getAllEvents(param).subscribe({
      next: (res) => {
        this.events = res.body.data;
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
    this.getAllEvents();
  }

  openDelete(event: any) {
    this.id = event;
    this.deleteSwal.fire();
  }

  triggerDelete() {
    this._EventService.deleteEvent(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.successSwal.fire().then(() => {
          this.getAllEvents();
        });
      },
      error: () => {},
    });
  }
}
