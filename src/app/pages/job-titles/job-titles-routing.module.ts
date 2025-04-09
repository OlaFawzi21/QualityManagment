import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobTitlesComponent } from './job-titles.component';
import { AddEditJobComponent } from './components/add-edit-job/add-edit-job.component';
import { JobTitleDetailComponent } from './components/job-title-detail/job-title-detail.component';
import { SignatureLogComponent } from './components/signature-log/signature-log.component';

const routes: Routes = [
  {
    path: '',
    component: JobTitlesComponent,
  },
  { path: 'jobTitle', component: AddEditJobComponent },
  { path: 'jobTitle/:id', component: AddEditJobComponent },
  { path: 'jobTitleDetail', component: JobTitleDetailComponent },
  { path: 'signatureLog', component: SignatureLogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobTitlesRoutingModule {}
