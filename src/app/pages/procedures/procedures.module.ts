import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProceduresRoutingModule } from './procedures-routing.module';
import { ProceduresComponent } from './procedures.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { ProcedureDetailComponent } from './components/procedure-detail/procedure-detail.component';
import { SignatureLogComponent } from './components/signature-log/signature-log.component';
import { AddEditProcedureComponent } from './components/add-edit-procedure/add-edit-procedure.component';

@NgModule({
  declarations: [
    ProceduresComponent,
    ProcedureDetailComponent,
    SignatureLogComponent,
    AddEditProcedureComponent,
  ],
  imports: [
    CommonModule,
    ProceduresRoutingModule,
    SharedModule,
    SweetAlert2Module.forChild(),
  ],
})
export class ProceduresModule {}
