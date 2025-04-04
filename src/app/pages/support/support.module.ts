import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';
import { GeneralInquiryComponent } from './components/general-inquiry/general-inquiry.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';

@NgModule({
  declarations: [
    SupportComponent,
    GeneralInquiryComponent,
    SuggestionsComponent,
    ComplaintsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SupportComponent,
        children: [
          {
            path: 'general-inquiry',
            component: GeneralInquiryComponent,
          },
          {
            path: 'suggestions',
            component: SuggestionsComponent,
          },
          {
            path: 'complaints',
            component: ComplaintsComponent,
          },
          { path: '', redirectTo: 'general-inquiry', pathMatch: 'full' },
        ],
      },
    ]),
    SweetAlert2Module.forChild(),
    SharedModule,
  ],
})
export class SupportModule {}
