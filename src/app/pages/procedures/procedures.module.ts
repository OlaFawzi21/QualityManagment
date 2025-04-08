import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProceduresRoutingModule } from './procedures-routing.module';
import { ProceduresComponent } from './procedures.component';


@NgModule({
  declarations: [
    ProceduresComponent
  ],
  imports: [
    CommonModule,
    ProceduresRoutingModule
  ]
})
export class ProceduresModule { }
