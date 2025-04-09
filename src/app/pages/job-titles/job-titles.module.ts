import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobTitlesRoutingModule } from './job-titles-routing.module';
import { JobTitlesComponent } from './job-titles.component';
import { AddEditJobComponent } from './components/add-edit-job/add-edit-job.component';
import { SignatureLogComponent } from './components/signature-log/signature-log.component';
import { JobTitleDetailComponent } from './components/job-title-detail/job-title-detail.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    JobTitlesComponent,
    AddEditJobComponent,
    SignatureLogComponent,
    JobTitleDetailComponent,
  ],
  imports: [
    CommonModule,
    JobTitlesRoutingModule,
    SharedModule,
    SweetAlert2Module.forChild(),
  ],
})
export class JobTitlesModule {}
