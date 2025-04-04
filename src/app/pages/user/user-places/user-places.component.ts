import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { PlacesService } from 'src/app/_metronic/layout/core/services/places/places.service';
import { UsersService } from 'src/app/_metronic/layout/core/services/users/users.service';
import { environment } from 'src/environments/environment';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-user-places',
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.scss',
})
export class UserPlacesComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _UsersService = inject(UsersService);
  assets: any = environment.assets;

  places: any[] = [];
  param: any;

  first: number = 1;

  rows: number = 10;
  id: any;

  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  @ViewChild('successSwal') successSwal: SwalComponent;
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  };

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    const id = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.id = id;
    if (this.id) {
      this.getAllPlaces();
    }
  }

  getAllPlaces() {
    this._UsersService.getUserById(this.id).subscribe((res) => {
      this.places = res.data.userPlaces;
      console.log('places', this.places);
      this.cdr.detectChanges();
    });
  }
}
