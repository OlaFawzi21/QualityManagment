import { Routes } from '@angular/router';
import { AuthGuard } from '../modules/auth/services/auth.guard';

const Routing: Routes = [
  {
    path: 'dashboard',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'allNotifications',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./all-notifications/all-notifications.module').then(
        (m) => m.AllNotificationsModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../pages/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'places',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./places/places.module').then((m) => m.PlacesModule),
  },
  {
    path: 'location',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'management',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./web-managment/web-managment.module').then(
        (m) => m.WebManagmentModule
      ),
  },
  {
    path: 'support',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./support/support.module').then((m) => m.SupportModule),
  },
  {
    path: 'settings',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'reports',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },

  {
    path: 'crafted/account',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'users',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('../pages/user/user.module').then((m) => m.UserModule),
  },

  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
