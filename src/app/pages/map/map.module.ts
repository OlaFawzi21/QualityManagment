import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddMapComponent } from './add-map/add-map.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
@NgModule({
  declarations: [MapComponent, AddMapComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MapComponent,
      },
      {
        path: 'add-map',
        component: AddMapComponent,
      },
      {
        path: 'edit-map/:id',
        component: AddMapComponent,
      },
    ]),
    SweetAlert2Module.forChild(),
    SharedModule,
  ],
})
export class MapModule {}
