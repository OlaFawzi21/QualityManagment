import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationalReportComponent } from './components/operational-report/operational-report.component';
import { SecurityReportComponent } from './components/security-report/security-report.component';
import { TechnicalReportComponent } from './components/technical-report/technical-report.component';
import { InteractiveReportComponent } from './components/interactive-report/interactive-report.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AllReportComponent } from './components/all-report/all-report.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { VisitorStatisticComponent } from './components/operational-report/components/visitor-statistic/visitor-statistic.component';
import { QrCodeComponent } from './components/operational-report/components/qr-code/qr-code.component';
import { AppPerformanceComponent } from './components/operational-report/components/app-performance/app-performance.component';
import { PublicSafetyComponent } from './components/security-report/components/public-safety/public-safety.component';
import { EmergencyNotificationsComponent } from './components/security-report/components/emergency-notifications/emergency-notifications.component';
import { VisitorTrackingComponent } from './components/security-report/components/visitor-tracking/visitor-tracking.component';

@NgModule({
  declarations: [
    OperationalReportComponent,
    SecurityReportComponent,
    TechnicalReportComponent,
    InteractiveReportComponent,
    AllReportComponent,
    VisitorStatisticComponent,
    QrCodeComponent,
    AppPerformanceComponent,
    PublicSafetyComponent,
    EmergencyNotificationsComponent,
    VisitorTrackingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AllReportComponent,
      },
      {
        path: 'operational-administrative-report',
        component: OperationalReportComponent,
        children: [
          { path: '', redirectTo: 'visitor-statistics', pathMatch: 'full' },
          { path: 'visitor-statistics', component: VisitorStatisticComponent },
          { path: 'qrCode-analysis', component: QrCodeComponent },
          {
            path: 'application-performance',
            component: AppPerformanceComponent,
          },
        ],
      },
      {
        path: 'interactive-reports',
        component: InteractiveReportComponent,
      },
      {
        path: 'security-reports',
        component: SecurityReportComponent,
        children: [
          {
            path: '',
            redirectTo: 'public-safety',
            pathMatch: 'full',
          },
          {
            path: 'public-safety',
            component: PublicSafetyComponent,
          },
          { path: 'emergency-notifications', component: EmergencyNotificationsComponent },
          {
            path: 'visitor-traffic-tracking',
            component: VisitorTrackingComponent,
          },
        ],
      },
      {
        path: 'technical-reports',
        component: TechnicalReportComponent,
      },
    ]),
    SweetAlert2Module.forChild(),
  ],
})
export class ReportsModule {}
