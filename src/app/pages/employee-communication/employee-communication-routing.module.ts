import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCommunicationComponent } from './employee-communication.component';

const routes: Routes = [{ path: '', component: EmployeeCommunicationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeCommunicationRoutingModule { }
