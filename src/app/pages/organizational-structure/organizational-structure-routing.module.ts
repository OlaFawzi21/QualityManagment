import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationalStructureComponent } from './organizational-structure.component';
import { SignatureRecordComponent } from './Signature record/signature-record/signature-record.component';
import { WatchedComponent } from './watched/watched/watched.component';
import { UnwatchedComponent } from './unwatched/unwatched/unwatched.component';

const routes: Routes = [
  { path: '', component: OrganizationalStructureComponent },
  {
    path: 'SignatureRecord',
    component: SignatureRecordComponent,
    children: [
      { path: '', redirectTo: 'watched', pathMatch: 'full' },
      { path: 'watched', component: WatchedComponent},
      { path: 'Unwatched', component: UnwatchedComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationalStructureRoutingModule { }
