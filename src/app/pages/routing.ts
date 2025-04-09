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
    path: 'management',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./web-managment/web-managment.module').then(
        (m) => m.WebManagmentModule
      ),
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
    path: 'settings',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'organizationalStructure',
    loadChildren: () =>
      import(
        '../pages/organizational-structure/organizational-structure.module'
      ).then((m) => m.OrganizationalStructureModule),
  },
  {
    path: 'jobTitles',
    loadChildren: () =>
      import('../pages/job-titles/job-titles.module').then(
        (m) => m.JobTitlesModule
      ),
  },
  {
    path: 'procedures',
    loadChildren: () =>
      import('../pages/procedures/procedures.module').then(
        (m) => m.ProceduresModule
      ),
  },
  {
    path: 'training',
    loadChildren: () =>
      import('../pages/training/training.module').then((m) => m.TrainingModule),
  },
  {
    path: 'surveys',
    loadChildren: () =>
      import('../pages/surveys/surveys.module').then((m) => m.SurveysModule),
  },
  {
    path: 'documentManager',
    loadChildren: () =>
      import('../pages/document-manager/document-manager.module').then(
        (m) => m.DocumentManagerModule
      ),
  },
  {
    path: 'incidentReporting',
    loadChildren: () =>
      import('../pages/incident-reporting/incident-reporting.module').then(
        (m) => m.IncidentReportingModule
      ),
  },
  {
    path: 'systemActivity',
    loadChildren: () =>
      import('../pages/system-activity/system-activity.module').then(
        (m) => m.SystemActivityModule
      ),
  },
  {
    path: 'employeeCommunication',
    loadChildren: () =>
      import(
        '../pages/employee-communication/employee-communication.module'
      ).then((m) => m.EmployeeCommunicationModule),
  },
  {
    path: 'companies',
    loadChildren: () =>
      import('../pages/companies/companies.module').then(
        (m) => m.CompaniesModule
      ),
  },
  {
    path: 'medicalLibrary',
    loadChildren: () =>
      import('../pages/medical-library/medical-library.module').then(
        (m) => m.MedicalLibraryModule
      ),
  },
  {
    path: 'licenses',
    loadChildren: () =>
      import('../pages/licenses/licenses.module').then((m) => m.LicensesModule),
  },
  {
    path: 'complaints',
    loadChildren: () =>
      import('../pages/complaints/complaints.module').then(
        (m) => m.ComplaintsModule
      ),
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
