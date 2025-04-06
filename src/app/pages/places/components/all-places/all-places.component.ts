import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PlacesService } from './../../../../_metronic/layout/core/services/places/places.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-all-places',
  templateUrl: './all-places.component.html',
  styleUrl: './all-places.component.scss',
})
export class AllPlacesComponent {
  selectedType: string = '';
  places = [];
  types: any[] = [
    {
      label: 'تاريخي',
      value: 0,
    },
    {
      label: 'أثري',
      value: 1,
    },
    {
      label: 'ثقافي',
      value: 2,
    },
    {
      label: 'طبيعي',
      value: 3,
    },
    {
      label: 'ديني',
      value: 4,
    },
  ];
  first: number = 0;
  rows: number = 10;
  id: string;
  totalRecords: number = 0;
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  @ViewChild('successSwal') successSwal: SwalComponent;
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  };

  constructor(
    private placesService: PlacesService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllPlaces();
  }

  getAllPlaces() {
    const param = {
      PageIndex: Math.floor(this.first / this.rows) + 1,
      PageSize: this.rows,
      classification: this.selectedType,
    };
    this.placesService.getAllPlaces(param).subscribe({
      next: (res) => {
        this.places = res.body.data;
        const xPagination = res.headers.get('x-pagination');
        if (xPagination) {
          const paginationData = JSON.parse(xPagination);
          this.totalRecords = paginationData.TotalCount;
        }
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  onFilterChange() {
    this.getAllPlaces();
  }
  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.getAllPlaces();
  }

  openDelete(event: any) {
    this.id = event;
    this.deleteSwal.fire();
  }

  triggerDelete() {
    this.placesService.deletePlace(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.successSwal.fire().then(() => {
          this.getAllPlaces();
        });
      },
      error: () => {},
    });
  }
}
