import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeCommunicationRoutingModule } from './employee-communication-routing.module';
import { EmployeeCommunicationComponent } from './employee-communication.component';


@NgModule({
  declarations: [
    EmployeeCommunicationComponent
  ],
  imports: [
    CommonModule,
    EmployeeCommunicationRoutingModule
  ]
})
export class EmployeeCommunicationModule { }
