import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { HeritageDashboardComponent } from './components/heritage-dashboard/heritage-dashboard.component';
import { HeritageAllPlacesComponent } from './components/places/heritage-all-places/heritage-all-places.component';
import { HeritagePlaceComponent } from './components/places/heritage-place/heritage-place.component';
import { SharedModule } from '../../_metronic/shared/shared.module';
import { WidgetsModule } from 'src/app/_metronic/partials';
import { HeritageAllReportsComponent } from './components/reports/heritage-all-reports/heritage-all-reports.component';
import { HeritageInteractiveReportComponent } from './components/reports/heritage-interactive-report/heritage-interactive-report.component';
import { HeritageTechnicalReportComponent } from './components/reports/heritage-technical-report/heritage-technical-report.component';
import { HeritageAuthorityComponent } from './heritage-authority.component';

@NgModule({
  declarations: [
    HeritageAuthorityComponent,
    HeritageDashboardComponent,
    HeritageAllPlacesComponent,
    HeritagePlaceComponent,
    HeritageAllReportsComponent,
    HeritageInteractiveReportComponent,
    HeritageTechnicalReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forChild(),
    WidgetsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HeritageAuthorityComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'dashboard',
          },
          {
            path: 'dashboard',
            component: HeritageDashboardComponent,
          },
          {
            path: 'places',
            component: HeritageAllPlacesComponent,
          },
          {
            path: 'add-place',
            component: HeritagePlaceComponent,
          },
          {
            path: 'edit-place/:id',
            component: HeritagePlaceComponent,
          },
          {
            path: 'reports',
            component: HeritageAllReportsComponent,
          },

          {
            path: 'interactive-reports',
            component: HeritageInteractiveReportComponent,
          },

          {
            path: 'technical-reports',
            component: HeritageTechnicalReportComponent,
          },
        ],
      },
    ]),
  ],
})
export class HeritageAuthorityModule {}
