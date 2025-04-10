import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProceduresComponent } from './procedures.component';
import { SignatureLogComponent } from './components/signature-log/signature-log.component';
import { ProcedureDetailComponent } from './components/procedure-detail/procedure-detail.component';
import { AddEditProcedureComponent } from './components/add-edit-procedure/add-edit-procedure.component';
import { WatchedComponent } from './components/signature-log/watched/watched.component';
import { UnwatchedComponent } from './components/signature-log/unwatched/unwatched.component';
import { AddProcedureComponent } from './components/add-edit-procedure/steps/add-procedure/add-procedure.component';
import { AddStepsComponent } from './components/add-edit-procedure/steps/add-steps/add-steps.component';
import { AddPolicyComponent } from './components/add-edit-procedure/steps/add-policy/add-policy.component';
import { AddClarificationsComponent } from './components/add-edit-procedure/steps/add-clarifications/add-clarifications.component';
import { AddPerformanceIndicatorComponent } from './components/add-edit-procedure/steps/add-performance-indicator/add-performance-indicator.component';

const routes: Routes = [
  { path: '', component: ProceduresComponent },
  {
    path: 'addProcedure',
    component: AddEditProcedureComponent,
    children: [
      { path: '', redirectTo: 'procedure', pathMatch: 'full' },
      { path: 'procedure', component: AddProcedureComponent },
      { path: 'steps', component: AddStepsComponent },
      { path: 'policy', component: AddPolicyComponent },
      { path: 'clarification', component: AddClarificationsComponent },
      {
        path: 'performanceIndicator',
        component: AddPerformanceIndicatorComponent,
      },
    ],
  },
  {
    path: 'editProcedure/:id',
    component: AddEditProcedureComponent,
    children: [
      { path: '', redirectTo: 'procedure', pathMatch: 'full' },
      { path: 'procedure', component: AddProcedureComponent },
      { path: 'steps', component: AddStepsComponent },
      { path: 'policy', component: AddPolicyComponent },
      { path: 'clarification', component: AddClarificationsComponent },
      {
        path: 'performanceIndicator',
        component: AddPerformanceIndicatorComponent,
      },
    ],
  },
  { path: 'procedureDetail', component: ProcedureDetailComponent },
  {
    path: 'signatureLog',
    component: SignatureLogComponent,
    children: [
      { path: '', redirectTo: 'watched', pathMatch: 'full' },
      { path: 'watched', component: WatchedComponent },
      { path: 'Unwatched', component: UnwatchedComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProceduresRoutingModule {}
