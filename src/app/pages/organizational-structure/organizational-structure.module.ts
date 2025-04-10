import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationalStructureRoutingModule } from './organizational-structure-routing.module';
import { OrganizationalStructureComponent } from './organizational-structure.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { ManagementDetailsComponent } from './components/management-details/management-details/management-details.component';
import { AddingSectionComponent } from './components/management-details/adding-section/adding-section/adding-section.component';
import { DetailsComponent } from './components/details/details/details.component';
import { UserChartComponent } from './components/userChart/user-chart/user-chart.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
@NgModule({
  declarations: [
    OrganizationalStructureComponent,
    ManagementDetailsComponent,
    AddingSectionComponent,
    DetailsComponent,
    UserChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrganizationalStructureRoutingModule,
    OrganizationChartModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class OrganizationalStructureModule {}
