import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProceduresComponent } from './procedures.component';
import { SignatureLogComponent } from './components/signature-log/signature-log.component';
import { ProcedureDetailComponent } from './components/procedure-detail/procedure-detail.component';
import { AddEditProcedureComponent } from './components/add-edit-procedure/add-edit-procedure.component';

const routes: Routes = [
  { path: '', component: ProceduresComponent },
  { path: 'procedure', component: AddEditProcedureComponent },
  { path: 'procedure/:id', component: AddEditProcedureComponent },
  { path: 'procedureDetail', component: ProcedureDetailComponent },
  { path: 'signatureLog', component: SignatureLogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProceduresRoutingModule {}
