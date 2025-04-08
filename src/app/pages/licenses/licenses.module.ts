import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicensesRoutingModule } from './licenses-routing.module';
import { LicensesComponent } from './licenses.component';


@NgModule({
  declarations: [
    LicensesComponent
  ],
  imports: [
    CommonModule,
    LicensesRoutingModule
  ]
})
export class LicensesModule { }
