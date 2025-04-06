import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/_metronic/layout/core/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  private readonly _UsersService = inject(UsersService);
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);
  assets = environment.assets;
  user: any = {};
  userDetails: any;
  roles: any;
  id: any;
  ngOnInit(): void {
    this.route.params.subscribe({
      next: ({ id }) => {
        this.id = id;
        if (this.id) {
          this.getUserById();
        }
      },
    });
  }

  getUserById() {
    this._UsersService.getUserById(this.id).subscribe((res) => {
      console.log(res.data);
      this.userDetails = res.data;
      this.user = res.data.userDetails;

      this.cdr.detectChanges();
    });
  }
}
