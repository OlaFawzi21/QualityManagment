import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentManagerRoutingModule } from './document-manager-routing.module';
import { DocumentManagerComponent } from './document-manager.component';


@NgModule({
  declarations: [
    DocumentManagerComponent
  ],
  imports: [
    CommonModule,
    DocumentManagerRoutingModule
  ]
})
export class DocumentManagerModule { }
