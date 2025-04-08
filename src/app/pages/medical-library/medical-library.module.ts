import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalLibraryRoutingModule } from './medical-library-routing.module';
import { MedicalLibraryComponent } from './medical-library.component';


@NgModule({
  declarations: [
    MedicalLibraryComponent
  ],
  imports: [
    CommonModule,
    MedicalLibraryRoutingModule
  ]
})
export class MedicalLibraryModule { }
