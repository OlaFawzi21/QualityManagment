import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { CustomerServiceService } from 'src/app/_metronic/layout/core/services/customerService/customerService.service';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-tables-widget10',
  templateUrl: './tables-widget10.component.html',
  styleUrls: ['./tables-widget10.component.scss'],
})
export class TablesWidget10Component implements OnInit {
  generalInq: any[] = [];

  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  };

  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  @ViewChild('successSwal') successSwal: SwalComponent;

  status: boolean | null = null;

  user: any = {};
  note: string;
  selectedStatus: boolean | null = null;

  lenMsg: number;

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;

  id: number;

  types: any[] = [
    {
      label: 'تم التواصل',
      value: true,
    },
    {
      label: 'لم نستطيع التواصل مع العميل',
      value: false,
    },
  ];

  constructor(
    private modalService: NgbModal,
    private customerService: CustomerServiceService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getInquiries();
  }

  getInquiries() {
    const param = {
      PageIndex: Math.floor(this.first / this.rows) + 1,
      PageSize: this.rows,
      type: '',
      IsClosed: this.status,
    };
    this.customerService.getAll(param).subscribe({
      next: (res) => {
        this.generalInq = res.body.data;
        console.log(this.generalInq);
        this.lenMsg = this.generalInq.filter(
          (inquiry) => inquiry.isClosed === false
        ).length;

        const xPagination = res.headers.get('x-pagination');
        if (xPagination) {
          const paginationData = JSON.parse(xPagination);
          this.totalRecords = paginationData.TotalCount;
        }
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.getInquiries();
  }

  openDeleteSwal(id: any) {
    this.id = id;
    this.deleteSwal.fire();
  }

  triggerDelete() {
    this.customerService.deleteTicket(this.id).subscribe({
      next: (res) => {
        this.successSwal.fire().then(() => {
          this.getInquiries();
        });
      },
      error: () => {},
    });
  }

  openModal(id: number, modal: any) {
    this.id = id;
    this.customerService.getDetails(id).subscribe({
      next: (res) => {
        console.log(res);
        this.user = res.data;
        this.selectedStatus = this.user.isClosed ? true : false;
        this.note = this.user.notes || '';
      },
    });
    this.modalService.open(modal, {
      centered: true,
    });
  }

  onSubmit() {
    const ticket = {
      ticketId: this.id,
      iscontacted: this.selectedStatus,
      notes: this.note,
    };

    this.customerService.updateTicket(ticket).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.messageService.add({
            severity: 'success',
            detail: 'تمت التحديث بنجاح',
          });
          this.modalService.dismissAll();
          this.getInquiries();
        }
      },
    });
  }
}
