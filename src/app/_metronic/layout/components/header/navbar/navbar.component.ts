import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { menuReinitialization } from 'src/app/_metronic/kt/kt-helpers';
import { UserProfileService } from '../../../core/services/users/user-profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Input() appHeaderDefaulMenuDisplay: boolean;
  @Input() isRtl: boolean;

  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string =
    'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  userAvatarClass: string = 'symbol-35px symbol-md-40px';
  btnIconClass: string = 'fs-2 fs-md-1';
  private readonly _UserProfileService = inject(UserProfileService);
  private readonly cdr = inject(ChangeDetectorRef);
  user: any = {};
  assts = environment.assets;
  currentDir = document.documentElement.dir;
  constructor() {}

  ngAfterViewInit(): void {
    menuReinitialization();
  }

  ngOnInit(): void {
    const storedDir = localStorage.getItem('direction') || 'rtl';
    document.documentElement.dir = storedDir;
    this.currentDir = storedDir;
    this.getUserProfile();
    this.updateStylesheets();
  }

  getUserProfile() {
    this._UserProfileService.getProfileInfo().subscribe({
      next: (res) => {
        this.user = res.data;
        this.cdr.detectChanges();
      },
    });
  }

  toggleDirection() {
    this.currentDir = document.documentElement.dir;
    if (this.currentDir === 'rtl') {
      document.documentElement.dir = 'ltr';
      localStorage.setItem('direction', 'ltr');
    } else {
      document.documentElement.dir = 'rtl';
      localStorage.setItem('direction', 'rtl');
    }
    this.updateStylesheets();
  }

  updateStylesheets() {
    this.currentDir = document.documentElement.dir;

    const rtlLink = document.getElementById('style-rtl') as HTMLLinkElement;
    const ltrLink = document.getElementById('style-ltr') as HTMLLinkElement;

    if (this.currentDir === 'rtl') {
      rtlLink.disabled = false;
      ltrLink.disabled = true;
    } else {
      rtlLink.disabled = true;
      ltrLink.disabled = false;
    }
  }
}
