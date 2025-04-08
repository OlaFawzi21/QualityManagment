import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserProfileService } from 'src/app/_metronic/layout/core/services/users/user-profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  private readonly _UserProfileService = inject(UserProfileService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);

  formPassword!: FormGroup;
  isLoadingEdit = false;
  isHide: boolean = true;
  isHideNew: boolean = true;
  isHideConfirm: boolean = true;

  ngOnInit(): void {
    this.initPasswordForm();
  }

  initPasswordForm() {
    this.formPassword = this._FormBuilder.group({
      oldPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
      passwordConfirmation: ['', Validators.required],
    });

    this.formPassword.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  checkPasswords() {
    if (
      this.formPassword.get('password')?.value !==
      this.formPassword.get('passwordConfirmation')?.value
    ) {
      this.formPassword
        .get('passwordConfirmation')
        ?.setErrors({ notMatch: true });
    }
  }

  togglePasswordVisibility(field: string) {
    if (field === 'current') this.isHide = !this.isHide;
    else if (field === 'new') this.isHideNew = !this.isHideNew;
    else this.isHideConfirm = !this.isHideConfirm;
  }

  submitPasswordForm() {
    if (this.formPassword.invalid) {
      this.formPassword.markAllAsTouched();
      return;
    } else {
      this.isLoadingEdit = true;
      this._UserProfileService
        .changePassword(this.formPassword.value)
        .subscribe({
          next: (response: any) => {
            this.isLoadingEdit = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'تم تغيير كلمة المرور بنجاح!',
            });
            this.formPassword.reset();
          },
          error: (error: any) => {
            if ((error.error.description = 'Incorrect password.')) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'كمة المرور القديمه غير صحيحة!',
              });
              this.isLoadingEdit = false;
              this.cdr.detectChanges();
            }
          },
        });
    }
  }
}
