import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-unwatched',
  templateUrl: './unwatched.component.html',
  styleUrl: './unwatched.component.scss'
})
export class UnwatchedComponent {
 licenses: any[] = [];

  myForm = new FormGroup({
    dateLicense: new FormControl('2025-04-08', Validators.required),
  });

  isLoading = false;

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 10;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly modalService = inject(NgbModal);

  ngOnInit() {
    this.getLicenses();
  }

  getLicenses() {
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

  onSubmit() {}
}
