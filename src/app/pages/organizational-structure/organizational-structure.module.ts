import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationalStructureRoutingModule } from './organizational-structure-routing.module';
import { OrganizationalStructureComponent } from './organizational-structure.component';
import { JobViewComponent } from './job-view/job-view/job-view.component';
import { SignatureRecordComponent } from './Signature record/signature-record/signature-record.component';
import { WatchedComponent } from './watched/watched/watched.component';
import { UnwatchedComponent } from './unwatched/unwatched/unwatched.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DropdownMenusModule } from 'src/app/_metronic/partials';
import { JobResponspelitiesComponent } from './job-responspilies/job-responspelities/job-responspelities.component';
import { JobDeletedComponent } from './job-deleted/job-deleted/job-deleted.component';

@NgModule({
  declarations: [
    OrganizationalStructureComponent,
    JobViewComponent,
    SignatureRecordComponent,
    WatchedComponent,
    UnwatchedComponent,
    JobResponspelitiesComponent,
    JobDeletedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrganizationalStructureRoutingModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbTooltipModule,
    DropdownMenusModule,
  ]
})
export class OrganizationalStructureModule { }
