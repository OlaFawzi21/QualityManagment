import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SeoComponent } from './components/seo/seo.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'account', component: AccountComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'seo', component: SeoComponent },
      { path: '', redirectTo: 'account', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
