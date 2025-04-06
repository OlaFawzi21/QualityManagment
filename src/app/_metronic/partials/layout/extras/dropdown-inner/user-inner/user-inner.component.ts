import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { LoginService } from 'src/app/_metronic/layout/core/services/login/login.service';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/_metronic/layout/core/services/users/user-profile.service';
import { environment } from 'src/environments/environment';
// import { AuthService, UserType } from '../../../../../../modules/auth';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
  private readonly _LoginService = inject(LoginService);
  language: LanguageFlag;
  user$: Observable<any>;
  langs = languages;
  private unsubscribe: Subscription[] = [];
  assets = environment.assets;
  private route = inject(Router);
  constructor(private translationService: TranslationService) {}
  private readonly _UserProfileService = inject(UserProfileService);
  private readonly cdr = inject(ChangeDetectorRef);
  user: any = {};
  ngOnInit(): void {
    // this.user$ = this.auth.currentUserSubject.asObservable();
    this.setLanguage(this.translationService.getSelectedLanguage());
    this.getUserProfile();
  }
  getUserProfile() {
    this._UserProfileService.getProfileInfo().subscribe({
      next: (res) => {
        this.user = res.data;
        localStorage.setItem('username', this.user.fullName);
        this.cdr.detectChanges();
      },
    });
  }
  logout() {
    this._LoginService.logOut().subscribe({
      next: () => {
        this.route.navigate(['/auth/login']);
      },
    });
    // this.auth.logout();
    document.location.reload();
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    // document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'zh',
    name: 'Mandarin',
    flag: './assets/media/flags/china.svg',
  },
  {
    lang: 'es',
    name: 'Spanish',
    flag: './assets/media/flags/spain.svg',
  },
  {
    lang: 'ja',
    name: 'Japanese',
    flag: './assets/media/flags/japan.svg',
  },
  {
    lang: 'de',
    name: 'German',
    flag: './assets/media/flags/germany.svg',
  },
  {
    lang: 'fr',
    name: 'French',
    flag: './assets/media/flags/france.svg',
  },
];
