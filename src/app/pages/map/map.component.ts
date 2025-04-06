import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MapsService } from 'src/app/_metronic/layout/core/services/maps/maps.service';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  maps: any = [];
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

  constructor(
    private mapsService: MapsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getMaps();
  }

  getMaps() {
    this.param = { PageIndex: this.first, PageSize: this.rows };
    this.mapsService.getAllMaps(this.param).subscribe({
      next: (res) => {
        this.maps = res.body.data;
        console.log(this.maps);
        this.changeDetectorRef.detectChanges();
      },
      error: () => {},
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.getMaps();
  }

  openDeleteSwal(id: string) {
    this.deleteSwal.fire();
    this.id = id;
  }

  triggerDelete() {
    this.successSwal.fire();
  }
}
