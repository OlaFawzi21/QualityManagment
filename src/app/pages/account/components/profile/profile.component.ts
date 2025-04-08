import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DashboardService } from 'src/app/_metronic/layout/core/services/dashboard/dashboard.service';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { UserProfileService } from 'src/app/_metronic/layout/core/services/users/user-profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly _UserProfileService = inject(UserProfileService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _GeneralService = inject(GeneralService);
  private readonly _DashboardService = inject(DashboardService);
  private readonly cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);

  assets = environment.assets;
  myForm!: FormGroup;
  isLoading = false;
  profileImage: string = 'assets/images/img/Group.png';
  nations: any[] = [];

  ngOnInit(): void {
    this.initProfileForm();
    // this.getProfileInfo();
    this.getNation();
  }

  initProfileForm() {
    this.myForm = this._FormBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      // email: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      //   ],
      // ],
      phoneNumber: ['', [Validators.required]],
      NationalityId: ['', [Validators.required]],
      profilePicture: [''], // Assuming this holds a URL or base64 string
    });
  }

  // getProfileInfo() {
  //   this._UserProfileService.getProfileInfo().subscribe({
  //     next: (response: any) => {
  //       if (response && response.data) {
  //         this.myForm.patchValue({
  //           fullName: response.data.fullName,
  //           email: response.data.email,
  //           phoneNumber: response.data.phoneNumber,
  //           profilePicture: response.data.profilePicture,
  //         });
  //         this.profileImage = this.assets + response.data.profilePicture;
  //         this.cdr.detectChanges();
  //       }
  //     },
  //     error: (error: any) => {
  //       console.error('Error fetching user information', error);
  //     },
  //   });
  // }

  isImage(file: File): boolean {
    const allowedImageTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/svg+xml',
    ];
    return allowedImageTypes.includes(file.type);
  }

  onFileSelected(event: any) {
    const files = event.target.files;

    if (files && files.length > 0 && this.isImage(files[0])) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string; // Temporary preview before upload
      };
      reader.readAsDataURL(files[0]); // Read file for preview
      this.uploadImages(Array.from(files)); // Upload file
    } else {
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'تم التحميل!',
          });
        }
      },
      error: () => {
        console.log('فشل في تحميل الصورة');
      },
    });
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'تم تعديل بياناتك بنجاح!',
          });
          // this.getProfileInfo();
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Error updating profile information', error);
        },
      });
    }
  }

  getNation() {
    this._DashboardService.getNation().subscribe({
      next: (res) => {
        this.nations = res.data;
      },
    });
  }
}
