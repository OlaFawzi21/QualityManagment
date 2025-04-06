import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/_metronic/layout/core/services/users/users.service';
import { environment } from 'src/environments/environment';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('successSwal1') successSwal1: SwalComponent;
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _UsersService = inject(UsersService);
  assets: any = environment.assets;
  userDetails: any = {};

  isChecked: boolean = false;

  ngOnInit(): void {
    const id = Number(this.route.parent?.snapshot.paramMap.get('id'));
    console.log(id);
    this.getUserById(id);
  }

  toggleLockUser(id: number) {
    this._UsersService.toggleLockUser(id).subscribe({
      next: (res) => {
        this.successSwal.fire().then(() => {
          this.getUserById(id);
          this.isChecked = false;
          this.cdr.detectChanges();
        });
      },
    });
  }

  getUserById(id: number) {
    this._UsersService.getUserById(id).subscribe((res) => {
      this.userDetails = res.data.userDetails;
      // this.isChecked = this.userDetails?.isLocked ?? false;
      this.cdr.detectChanges();
    });
  }
}
