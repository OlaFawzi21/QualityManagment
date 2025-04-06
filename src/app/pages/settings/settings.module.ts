import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AccountComponent } from './components/account/account.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SeoComponent } from './components/seo/seo.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipModule } from 'primeng/chip';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    SettingsComponent,
    AccountComponent,
    NotificationsComponent,
    SeoComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    InputSwitchModule,
    ChipModule,
    SweetAlert2Module.forChild(),
  ],
})
export class SettingsModule {}
