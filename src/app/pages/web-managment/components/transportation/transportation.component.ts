import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import { TransportationService } from './../../../../_metronic/layout/core/services/transportation/transportation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrl: './transportation.component.scss',
})
export class TransportationComponent {
  isLoading = false;
  trans: any = [];
  formGroup!: FormGroup;
  formGroupEdit!: FormGroup;
  tranID: number;
  editMode: boolean;

  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  };

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  @ViewChild('formModal') formModal: any;
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  @ViewChild('successSwal') successSwal: SwalComponent;

  constructor(
    private modalService: NgbModal,
    private transService: TransportationService,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      type: [null, Validators.required],
    });

    this.formGroupEdit = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      type: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getAllTrans();
  }

  getAllTrans() {
    const param = {
      PageIndex: Math.floor(this.first / this.rows) + 1,
      PageSize: this.rows,
    };
    this.transService.getTrans(param).subscribe({
      next: (res) => {
        this.trans = res.body.data;
        console.log(res);
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
    this.getAllTrans();
  }

  getTran(tranID: number) {
    this.transService.getTran(tranID).subscribe({
      next: (res) => {
        this.formGroupEdit.patchValue(res.data);
        console.log(res.data);
      },
    });
  }

  submitTrans() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.transService.createTran(this.formGroup.value).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.getAllTrans();
        }
      },
      complete: () => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          detail: 'تمت إضافة وسيلة النقل بنجاح',
        });
      },
    });
  }

  submitEditTrans() {
    if (this.formGroupEdit.invalid) {
      this.formGroupEdit.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    console.log(this.editMode);

    this.transService.updateTran(this.formGroupEdit.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.isSuccess) {
          this.getAllTrans();
        }
      },
      complete: () => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          detail: 'تم تحديث وسيلة النقل بنجاح',
        });
      },
    });
  }

  openModal(tran: any) {
    this.modalService.open(this.formModal, {
      centered: true,
    });
    this.getTran(tran.id);
  }

  openDeleteSwal(id: number) {
    this.deleteSwal.fire();
    this.tranID = id;
  }

  triggerDelete() {
    this.transService.deleteTran(this.tranID).subscribe({
      next: () => {
        this.successSwal.fire();
        this.getAllTrans();
      },
    });
  }
}
