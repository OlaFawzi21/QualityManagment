import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalLibraryComponent } from './medical-library.component';

const routes: Routes = [{ path: '', component: MedicalLibraryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalLibraryRoutingModule { }
