import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentManagerComponent } from './document-manager.component';

const routes: Routes = [{ path: '', component: DocumentManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentManagerRoutingModule { }
