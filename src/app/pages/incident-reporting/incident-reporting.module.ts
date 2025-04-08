import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentReportingRoutingModule } from './incident-reporting-routing.module';
import { IncidentReportingComponent } from './incident-reporting.component';

@NgModule({
  declarations: [IncidentReportingComponent],
  imports: [CommonModule, IncidentReportingRoutingModule],
})
export class IncidentReportingModule {}
