import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './components/activities/activity/activity.component';
import { RouterModule } from '@angular/router';
import { EditActivityComponent } from './components/activities/edit-activity/edit-activity.component';
import { WidgetsModule } from 'src/app/_metronic/partials';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AllEventsComponent } from './components/events/all-events/all-events.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';

@NgModule({
  declarations: [
    ActivityComponent,
    EditActivityComponent,
    AllEventsComponent,
    EditEventComponent,
  ],
  imports: [
    CommonModule,
    SweetAlert2Module.forChild(),
    RouterModule.forChild([
      {
        path: 'activities',
        component: ActivityComponent,
      },
      {
        path: 'edit-activity/:id',
        component: EditActivityComponent,
      },
      {
        path: 'events',
        component: AllEventsComponent,
      },
      {
        path: 'edit-event/:id',
        component: EditEventComponent,
      },
      {
        path: 'add-event',
        component: EditEventComponent,
      },
      {
        path: 'add-activity',
        component: EditActivityComponent,
      },
    ]),
    WidgetsModule,
    SharedModule,
    CalendarModule,
    AccordionModule,
  ],
})
export class WebManagmentModule {}
