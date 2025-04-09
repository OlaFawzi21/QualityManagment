import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobTitlesRoutingModule } from './job-titles-routing.module';
import { JobTitlesComponent } from './job-titles.component';
import { AddEditJobComponent } from './components/add-edit-job/add-edit-job.component';
import { SignatureLogComponent } from './components/signature-log/signature-log.component';
import { JobTitleDetailComponent } from './components/job-title-detail/job-title-detail.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UnwatchedComponent } from './components/unwatched/unwatched.component';
import { WatchedComponent } from './components/watched/watched.component';
import { JobResponspelitiesComponent } from './components/job-responspelities/job-responspelities.component';
import { JobDeletedComponent } from './components/job-deleted/job-deleted.component';
import {
  NgbNavModule,
  NgbDropdownModule,
  NgbCollapseModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DropdownMenusModule } from 'src/app/_metronic/partials';

@NgModule({
  declarations: [
    JobTitlesComponent,
    AddEditJobComponent,
    SignatureLogComponent,
    JobTitleDetailComponent,
    WatchedComponent,
    UnwatchedComponent,
    JobResponspelitiesComponent,
    JobDeletedComponent,
  ],
  imports: [
    CommonModule,
    JobTitlesRoutingModule,
    SharedModule,
    SweetAlert2Module.forChild(),
    NgbNavModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbTooltipModule,
    DropdownMenusModule,
  ],
})
export class JobTitlesModule {}
