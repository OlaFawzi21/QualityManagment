import { SharedModule } from './../../_metronic/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPlacesComponent } from './components/all-places/all-places.component';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from 'src/app/_metronic/partials';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { PlaceComponent } from './components/place/place.component';

import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [AllPlacesComponent, PlaceDetailsComponent, PlaceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AllPlacesComponent,
      },
      {
        path: 'add-place',
        component: PlaceComponent,
      },
      {
        path: 'edit-place/:id',
        component: PlaceComponent,
      },
      {
        path: 'place-details/:id',
        component: PlaceDetailsComponent,
      },
    ]),
    WidgetsModule,
    SharedModule,
    GalleriaModule,
    DialogModule,
    ImageModule,
    SweetAlert2Module.forChild(),
    FormsModule,
    CalendarModule,
  ],
})
export class PlacesModule {}
