import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_metronic/layout/core/services/login/login.service';
import { SweetAlertOptions } from 'sweetalert2';
import { MessageService } from 'primeng/api';
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
  isLoading: boolean;
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

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ]),
      ],
    });
  }

  togglePasswordVisibility() {
    this.isHide = !this.isHide;
  }

  submit() {
    this._Router.navigate(['/dashboard']);
    // this.hasError = false;
    // this.isLoading = true;
    // const loginSubscr = this._LoginService
    //   .login(this.loginForm.value)
    //   .subscribe({
    //     next: (res: any) => {
    //       if (res.isSuccess === true) {
    //         this.isLoading = false;
    //         this.messageService.add({
    //           severity: 'success',
    //           summary: 'Success',
    //           detail: 'تم التسجيل بنجاح!',
    //         });
    //         this._LoginService.saveUserData(res.data);
    //      // this._LoginService.redirectUserBasedOnRole();
    //       }
    //     },
    //     error: (err) => {
    //       this.isLoading = false;
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: 'حدث خطأ اثناء تسجيل الدخول!',
    //       });
    //     },
    //   });
    // this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
