import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationalStructureComponent } from './organizational-structure.component';
import { DetailsComponent } from './components/details/details/details.component';
import { ManagementDetailsComponent } from './components/management-details/management-details/management-details.component';
import { AddingSectionComponent } from './components/management-details/adding-section/adding-section/adding-section.component';
import { UserChartComponent } from './components/userChart/user-chart/user-chart.component';

const routes: Routes = [
  { path: '', component: OrganizationalStructureComponent },
  { path: 'user-chart', component: UserChartComponent },
  { path: 'details', component: DetailsComponent,
    children: [
      { path: '', redirectTo: 'management-details', pathMatch: 'full' },
      { path: 'management-details', component: ManagementDetailsComponent },
      { path: 'adding-section', component: AddingSectionComponent },
    ],
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationalStructureRoutingModule {}
