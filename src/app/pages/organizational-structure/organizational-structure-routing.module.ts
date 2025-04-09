import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationalStructureComponent } from './organizational-structure.component';

const routes: Routes = [
  { path: '', component: OrganizationalStructureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationalStructureRoutingModule {}
