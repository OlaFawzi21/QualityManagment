import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllNotificationsComponent } from './all-notifications.component';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from 'src/app/_metronic/partials';

@NgModule({
  declarations: [AllNotificationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AllNotificationsComponent,
      },
    ]),
    WidgetsModule,
  ],
})
export class AllNotificationsModule {}
