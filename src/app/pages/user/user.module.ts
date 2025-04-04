import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListingComponent } from './user-listing/user-listing.component';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DropdownMenusModule, WidgetsModule } from 'src/app/_metronic/partials';
import { ProfileComponent } from './profile/profile.component';
import { ActivityComponent } from './activity/activity.component';
import { UserPlacesComponent } from './user-places/user-places.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    UserListingComponent,
    UserDetailsComponent,
    ProfileComponent,
    ActivityComponent,
    UserPlacesComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: UserListingComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
      },
      {
        path: ':id',
        component: UserDetailsComponent,
        children: [
          {
            path: 'profile',
            component: ProfileComponent,
          },
          {
            path: 'userPlaces',
            component: UserPlacesComponent,
          },
          {
            path: 'activity',
            component: ActivityComponent,
          },
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
        ],
      },
    ]),
    SharedModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbTooltipModule,
    DropdownMenusModule,
    WidgetsModule,
  ],
})
export class UserModule {}
