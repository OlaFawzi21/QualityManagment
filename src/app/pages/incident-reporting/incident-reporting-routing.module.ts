import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentReportingComponent } from './incident-reporting.component';

const routes: Routes = [{ path: '', component: IncidentReportingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentReportingRoutingModule {}
