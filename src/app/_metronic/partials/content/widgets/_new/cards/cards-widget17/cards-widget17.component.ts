import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { UserProfileService } from 'src/app/_metronic/layout/core/services/users/user-profile.service';
import { UsersService } from 'src/app/_metronic/layout/core/services/users/users.service';

@Component({
  selector: 'app-cards-widget17',
  templateUrl: './cards-widget17.component.html',
  styleUrls: ['./cards-widget17.component.scss'],
})
export class CardsWidget17Component implements OnInit {
  chartOptions: any = {};
  private readonly _UserProfileService = inject(UserProfileService);
  private readonly _UsersService = inject(UsersService);
  private readonly cdr = inject(ChangeDetectorRef);
  @Input() cssClass: string = '';
  @Input() chartSize: number = 70;
  @Input() chartLine: number = 11;
  @Input() chartRotate?: number = 145;
  username = '';
  userLenghth = 0;
  first: number = 0;
  rows: number = 10;
  constructor() {}

  ngOnInit(): void {
    this.getUserProfile();
    this.getAllUserslenght();
  }

  getUserProfile() {
    this._UserProfileService.getProfileInfo().subscribe({
      next: (res) => {
        this.username = res.data.fullName;
        this.cdr.detectChanges();
      },
    });
  }
  getAllUserslenght() {
    const param = {
      PageIndex: Math.floor(this.first / this.rows) + 1,
      PageSize: this.rows,
    };
    this._UsersService.getAllTourists(param).subscribe({
      next: (res: any) => {
        const xPagination = res.headers.get('x-pagination');
        if (xPagination) {
          const paginationData = JSON.parse(xPagination);
          this.userLenghth = paginationData.TotalCount;
        }
        this.cdr.detectChanges();
      },
    });
  }
}
