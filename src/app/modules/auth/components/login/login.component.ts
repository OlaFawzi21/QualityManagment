import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/_metronic/layout/core/services/login/login.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  isLoading$: Observable<boolean>;
  private readonly _Router = inject(Router);
  private readonly _LoginService = inject(LoginService);
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
  };
  // private fields
  private unsubscribe: Subscription[] = [];
  userData: any;

  isHide: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(8),
          Validators.maxLength(50),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
    });
  }

  togglePasswordVisibility() {
    this.isHide = !this.isHide;
  }

  submit() {
    this.hasError = false;
    const loginSubscr = this._LoginService
      .login(this.loginForm.value)
      .subscribe({
        next: (res: any) => {
          if (res.isSuccess === true) {
            this.successSwal.fire().then(() => {
              this._LoginService.saveUserData(res.data);
              this._LoginService.redirectUserBasedOnRole();
            });
          }
        },
        error: (err) => {
          console.log(err);
          this.deleteSwal.fire();
          console.log(err.error.title);
        },
      });

    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
