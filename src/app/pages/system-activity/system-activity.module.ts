import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemActivityRoutingModule } from './system-activity-routing.module';
import { SystemActivityComponent } from './system-activity.component';


@NgModule({
  declarations: [
    SystemActivityComponent
  ],
  imports: [
    CommonModule,
    SystemActivityRoutingModule
  ]
})
export class SystemActivityModule { }
