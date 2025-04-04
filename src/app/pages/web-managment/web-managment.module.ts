import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteComponent } from './components/website/website.component';
import { FaqComponent } from './components/faq/faq.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ActivityComponent } from './components/activities/activity/activity.component';
import { RouterModule } from '@angular/router';
import { EditActivityComponent } from './components/activities/edit-activity/edit-activity.component';
import { WidgetsModule } from 'src/app/_metronic/partials';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { AddEditTermsAndPrivacyComponent } from './components/terms-and-privacy/add-edit-terms-and-privacy/add-edit-terms-and-privacy.component';
import { AllTermsAndPrivacyComponent } from './components/all-terms-and-privacy/all-terms-and-privacy.component';
import { AboutHailComponent } from './components/about-us/about-hail/about-hail.component';
import { FamousPlacesComponent } from './components/about-us/famous-places/famous-places.component';
import { IntroduceVideoComponent } from './components/about-us/introduce-video/introduce-video.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SecurityAndSafetyComponent } from './components/security-and-safety/security-and-safety.component';
import { TransportationComponent } from './components/transportation/transportation.component';
import { AllEventsComponent } from './components/events/all-events/all-events.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';

@NgModule({
  declarations: [
    WebsiteComponent,
    FaqComponent,
    AboutUsComponent,
    ActivityComponent,
    EditActivityComponent,
    AddEditTermsAndPrivacyComponent,
    AllTermsAndPrivacyComponent,
    AboutHailComponent,
    FamousPlacesComponent,
    IntroduceVideoComponent,
    SecurityAndSafetyComponent,
    TransportationComponent,
    AllEventsComponent,
    EditEventComponent,
  ],
  imports: [
    CommonModule,
    SweetAlert2Module.forChild(),
    RouterModule.forChild([
      {
        path: 'edit-website',
        component: WebsiteComponent,
      },
      {
        path: 'security-and-safety',
        component: SecurityAndSafetyComponent,
      },
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
      {
        path: 'terms-and-privacy',
        component: AllTermsAndPrivacyComponent,
      },
      {
        path: 'edit-terms-and-privacy/:id',
        component: AddEditTermsAndPrivacyComponent,
      },
      {
        path: 'add-terms-and-privacy',
        component: AddEditTermsAndPrivacyComponent,
      },
      {
        path: 'FAQ',
        component: FaqComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        children: [
          {
            path: 'about-hail',
            component: AboutHailComponent,
          },
          {
            path: 'famous-hail-places',
            component: FamousPlacesComponent,
          },
          {
            path: 'introductory-video',
            component: IntroduceVideoComponent,
          },
          { path: '', redirectTo: 'about-hail', pathMatch: 'full' },
        ],
      },
      {
        path: 'transportation',
        component: TransportationComponent,
      },
    ]),
    WidgetsModule,
    SharedModule,
    CalendarModule,
    AccordionModule,
  ],
})
export class WebManagmentModule {}
