import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { PlacesService } from 'src/app/_metronic/layout/core/services/places/places.service';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-heritage-all-places',
  templateUrl: './heritage-all-places.component.html',
  styleUrl: './heritage-all-places.component.scss'
})
export class HeritageAllPlacesComponent {
places = [];

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
