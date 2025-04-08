import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemActivityComponent } from './system-activity.component';

const routes: Routes = [{ path: '', component: SystemActivityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemActivityRoutingModule { }
