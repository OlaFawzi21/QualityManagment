import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { UsersService } from 'src/app/_metronic/layout/core/services/users/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  private readonly _GeneralService = inject(GeneralService);
  private readonly _UsersService = inject(UsersService);
  private readonly cdr = inject(ChangeDetectorRef);

  folderName: any = '';
  formGroup!: FormGroup;
  user: any = {};
  isFileSelected1: boolean = false;
  id: string;
  editMode: boolean;
  isTourist: boolean = false;
  allDataSourse: any[] = [];
  imageName: any;
  roleName: any = '';
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('successSwal2') successSwal2: SwalComponent;
  @ViewChild('error') error: SwalComponent;

  roles: any = [
    {
      name: 'موظف',
      value: 'Employee',
    },
    {
      name: 'ادمن',
      value: 'Admin',
    },
    {
      name: 'مدير',
      value: 'Manager',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialForm();
    this.route.params.subscribe({
      next: ({ id }) => {
        this.id = id;
        if (this.id) {
          this.getUserForUpdate();
        }
      },
    });
  }

  initialForm() {
    this.formGroup = this.fb.group({
      id: [null],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roleName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      profilePicture: [''],
    });
  }

  getUserForUpdate() {
    this._UsersService.getUserForUpdate(this.id).subscribe({
      next: (res: any) => {
        this.user = res.data;
        if (this.user) {
          this.imageName = this.user.profilePicture?.split('/').pop() || '';
          this.roleName = this.user.roleName;
          this.isTourist = this.user.roleName === 'Tourist';
          this.formGroup.patchValue({
            id: this.user.id,
            fullName: this.user.fullName,
            email: this.user.email,
            roleName: this.user.roleName,
            phoneNumber: this.user.phoneNumber,
            profilePicture: this.user.profilePicture,
          });

          this.cdr.detectChanges();
        }
      },
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      console.log(this.formGroup.value);
      return;
    }

    console.log(this.formGroup.value);
    this.formGroup.get('id')?.enable();
    this._UsersService.updateUser(this.formGroup.value).subscribe({
      next: () => {
        // this.messageService.add({
        //   severity: 'success',
        //   detail: 'تم التحديث  بنجاح',
        // });
        this.successSwal2.fire().then(() => {
          this.getUserForUpdate();
        });
      },
      error: (err) => {
        console.log(err.error);

        if (err.error.isSuccess === false) {
          this.error.fire();
        }
      },
    });
  }
  onFileSelected1(event: any) {
    const files = event.target.files;
    this.isFileSelected1 = !!files.length;
    const allowedExtensions = ['jpg','jpeg', 'png', 'webp', 'svg'];
    const filesArray: File[] = Array.from(files);

    const validFiles = filesArray.filter((file: any) => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      return fileExtension && allowedExtensions.includes(fileExtension);
    });

    if (validFiles.length === 0) {
      this.messageService.add({
        severity: 'error',
        detail: 'الرجاء تحميل صور بامتدادات مدعومة: jpg, jpeg, png, webp, svg.',
      });
      return;
    }

    if (files && files.length > 0) {
      this.imageName = files[0].name;
      this.uploadImages(Array.from(files));
    }
  }
  uploadImages(files: File[]) {
    this.folderName = this.imageName;
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    this._GeneralService.uploadImage(formData, this.folderName).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);

        if (response.body && response.body.data.length > 0) {
          const uploadedImageUrl = response.body.data[0];
          this.formGroup.get('profilePicture')?.setValue(uploadedImageUrl);
          this.cdr.detectChanges();
          this.successSwal.fire();
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          detail: 'فشل رفع الصور.',
        });
      },
    });
  }
}
