import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProceduresRoutingModule } from './procedures-routing.module';
import { ProceduresComponent } from './procedures.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { ProcedureDetailComponent } from './components/procedure-detail/procedure-detail.component';
import { SignatureLogComponent } from './components/signature-log/signature-log.component';
import { AddEditProcedureComponent } from './components/add-edit-procedure/add-edit-procedure.component';
import { WatchedComponent } from './components/signature-log/watched/watched.component';
import { UnwatchedComponent } from './components/signature-log/unwatched/unwatched.component';
import { AddProcedureComponent } from './components/add-edit-procedure/steps/add-procedure/add-procedure.component';
import { AddStepsComponent } from './components/add-edit-procedure/steps/add-steps/add-steps.component';
import { AddPolicyComponent } from './components/add-edit-procedure/steps/add-policy/add-policy.component';
import { AddClarificationsComponent } from './components/add-edit-procedure/steps/add-clarifications/add-clarifications.component';
import { AddPerformanceIndicatorComponent } from './components/add-edit-procedure/steps/add-performance-indicator/add-performance-indicator.component';

@NgModule({
  declarations: [
    ProceduresComponent,
    ProcedureDetailComponent,
    SignatureLogComponent,
    AddEditProcedureComponent,
    WatchedComponent,
    UnwatchedComponent,
    AddProcedureComponent,
    AddStepsComponent,
    AddPolicyComponent,
    AddClarificationsComponent,
    AddPerformanceIndicatorComponent,
  ],
  imports: [
    CommonModule,
    ProceduresRoutingModule,
    SharedModule,
    SweetAlert2Module.forChild(),
  ],
})
export class ProceduresModule {}
