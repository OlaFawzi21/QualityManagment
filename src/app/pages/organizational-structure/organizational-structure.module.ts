import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationalStructureRoutingModule } from './organizational-structure-routing.module';
import { OrganizationalStructureComponent } from './organizational-structure.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';

@NgModule({
  declarations: [
    OrganizationalStructureComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrganizationalStructureRoutingModule,
  ],
})
export class OrganizationalStructureModule {}
