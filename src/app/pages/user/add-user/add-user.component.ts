import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { UsersService } from 'src/app/_metronic/layout/core/services/users/users.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('successSwal2') successSwal2: SwalComponent;
  @ViewChild('error') error: SwalComponent;

  private readonly _GeneralService = inject(GeneralService);
  private readonly _UsersService = inject(UsersService);
  private readonly cdr = inject(ChangeDetectorRef);

  folderName: any = '';
  formGroup!: FormGroup;
  isFileSelected1: boolean = false;
  id: string;
  editMode: boolean;
  allDataSourse: any[] = [];
  imageName: any;

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
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllDataSourceEmployers();
    this.initialForm();
  }
  initialForm() {
    this.formGroup = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      identityNumber: [
        '',
        Validators.required,
        [this.identityNumberValidatorAsync.bind(this)],
      ],
      phoneNumber: ['', Validators.required],
      dataSourceId: ['', Validators.required],
      roleName: ['', Validators.required],
      profilePicture: [''],
    });
  }

  identityNumberValidatorAsync(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return new Observable((observer) => {
      const value = control.value || '';
      const isTenDigits = /^\d{10}$/.test(value);
      const startsWithOneOrTwo = /^[12]/.test(value);
      if (!startsWithOneOrTwo) {
        observer.next({ startError: 'يجب أن يبدأ رقم الهوية بالرقم 1 أو 2.' });
      } else if (!isTenDigits) {
        observer.next({ lengthError: 'يجب أن يتكون رقم الهوية من 10 أرقام.' });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  }

  getAllDataSourceEmployers() {
    const param = {
      PageIndex: 1,
      PageSize: 100,
    };
    this._UsersService.getAllDataSources(param).subscribe({
      next: (res) => {
        this.allDataSourse = res.body.data || [];
        this.cdr.detectChanges();
      },
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      console.log(this.formGroup.value);
      return;
    }
    const formData = {
      ...this.formGroup.value,
      dataSourceId: Number(this.formGroup.value.dataSourceId),
      // phoneNumber: Number(this.formGroup.value.phoneNumber),
    };
    this._UsersService.createUser(formData).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.successSwal2.fire().then(() => {
            this.router.navigate(['/users']);
          });
        }
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
        detail: 'الرجاء تحميل صور بامتدادات مدعومة: jpg, jpeg, png, webp, svg',
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
