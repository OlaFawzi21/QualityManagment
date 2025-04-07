import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { UserProfileService } from 'src/app/_metronic/layout/core/services/users/user-profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
private readonly _UserProfileService = inject(UserProfileService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _GeneralService = inject(GeneralService);
  private readonly cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);
  
  assets = environment.assets;
  myForm!: FormGroup;
  formPassword!: FormGroup;
  isLoading = false;
  isLoadingEdit = false;
  isHide: boolean = true;
  isHideNew: boolean = true;
  isHideConfirm: boolean = true;
  profileImage: string = 'assets/images/img/Group.png';
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('successSwal2') successSwal2: SwalComponent;
  @ViewChild('successSwal3') successSwal3: SwalComponent;
  @ViewChild('error') error: SwalComponent;

  ngOnInit(): void {
    this.initProfileForm();
    this.initPasswordForm();
    this.getProfileInfo();
  }

  initProfileForm() {
    this.myForm = this._FormBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phoneNumber: ['', [Validators.required]],
      profilePicture: [''], // Assuming this holds a URL or base64 string
    });
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

  getProfileInfo() {
    this._UserProfileService.getProfileInfo().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.myForm.patchValue({
            fullName: response.data.fullName,
            email: response.data.email,
            phoneNumber: response.data.phoneNumber,
            profilePicture: response.data.profilePicture,
          });
          this.profileImage = this.assets + response.data.profilePicture;
          this.cdr.detectChanges();
        }
      },
      error: (error: any) => {
        console.error('Error fetching user information', error);
      },
    });
  }

  isImage(file: File): boolean {
    const allowedImageTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
    ];
    return allowedImageTypes.includes(file.type);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0 && this.isImage(files)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string; // Temporary preview before upload
      };
      reader.readAsDataURL(files[0]); // Read file for preview
      this.uploadImages(Array.from(files)); // Upload file
    }
    else {
      this.messageService.add({
        severity: 'error',
        detail: 'الرجاء تحميل صور بامتدادات مدعومة: jpg, jpeg, png, webp, svg',
      });
    }
  }

  uploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    this._GeneralService.uploadImage(formData, 'profileImage').subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);
        if (response.body && response.body.data.length > 0) {
          const uploadedImageUrl = response.body.data[0]; // Get the uploaded image URL
          this.profileImage = this.assets + uploadedImageUrl; // Set the uploaded image URL as profile image
          this.myForm.get('profilePicture')?.setValue(uploadedImageUrl);
          this.cdr.detectChanges();
          this.successSwal.fire();
        }
      },
      error: () => {
        console.log('فشل في تحميل الصورة');
      },
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

  submitForm() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    } else {
      this.isLoading = true;
      this._UserProfileService.updateProfileInfo(this.myForm.value).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.successSwal2.fire().then(() => {
            this.getProfileInfo();
          });
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Error updating profile information', error);
        },
      });
    }
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
            this.successSwal3.fire().then(() => {
              this.formPassword.reset();
            });
          },
          error: (error: any) => {
            if ((error.error.description = 'Incorrect password.')) {
              this.error.fire().then(() => {
                this.isLoadingEdit = false;
                this.cdr.detectChanges();
              });
            }
          },
        });
    }
  }
}
