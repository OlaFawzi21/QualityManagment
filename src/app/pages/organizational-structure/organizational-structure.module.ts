import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationalStructureRoutingModule } from './organizational-structure-routing.module';
import { OrganizationalStructureComponent } from './organizational-structure.component';


@NgModule({
  declarations: [
    OrganizationalStructureComponent
  ],
  imports: [
    CommonModule,
    OrganizationalStructureRoutingModule
  ]
})
export class OrganizationalStructureModule { }
