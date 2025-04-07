import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LicensesComponent } from './components/licenses/licenses.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    ChangePasswordComponent,
    LicensesComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    InputSwitchModule,
    SweetAlert2Module.forChild(),
  ],
})
export class AccountModule {}
