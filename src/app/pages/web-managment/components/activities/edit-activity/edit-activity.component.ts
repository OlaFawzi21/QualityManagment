import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { ActivityService } from 'src/app/_metronic/layout/core/services/web-managment/activity.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrl: './edit-activity.component.scss',
})
export class EditActivityComponent {
  private readonly _GeneralService = inject(GeneralService);
  private readonly cdr = inject(ChangeDetectorRef);

  folderName: any = '';

  formGroup!: FormGroup;
  types: any[] = [
    {
      label: 'فندق',
      value: 1,
    },
    {
      label: 'مطعم',
      value: 0,
    },
  ];

  activity: any = {};

  id: string;
  editMode: boolean;

  imageName: any;

  @ViewChild('successSwal') successSwal: SwalComponent;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private activityService: ActivityService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.route.params.subscribe({
      next: ({ id }) => {
        this.id = id;
      },
    });
    if (this.id) {
      this.editMode = true;
      this.getActivity();
    } else {
      this.editMode = false;
    }
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: ['', Validators.required],
      description: ['', Validators.required],
      openingTime: [null, Validators.required],
      closingTime: [null, Validators.required],
      posterUrl: ['', Validators.required],
      type: [null, Validators.required],
    });
  }

  getActivity() {
    this.activityService.getActivity(this.id).subscribe({
      next: (res: any) => {
        this.activity = res.data;
        this.imageName = this.activity.posterUrl.split('/').pop() || '';
        if (this.activity) {
          this.formGroup.patchValue({
            id: this.activity.id,
            name: this.activity.name,
            description: this.activity.description,
            posterUrl: this.activity.posterUrl,
            type: this.activity.type,
            openingTime: this.convertTimeStringToDate(
              this.activity.openingTime
            ),
            closingTime: this.convertTimeStringToDate(
              this.activity.closingTime
            ),
          });
        }
      },
    });
  }

  convertTimeStringToDate(timeString: string): Date | null {
    if (!timeString) return null;
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds || 0);
    return date;
  }

  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      console.log(this.formGroup.value);
      return;
    }

    const formattedOpeningTime = this.formatTime(
      this.formGroup.get('openingTime')?.value
    );
    const formattedClosingTime = this.formatTime(
      this.formGroup.get('closingTime')?.value
    );

    this.formGroup.get('openingTime')?.setValue(formattedOpeningTime);
    this.formGroup.get('closingTime')?.setValue(formattedClosingTime);

    if (!this.editMode)
      this.activityService.createActivity(this.formGroup.value).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.messageService.add({
              severity: 'success',
              detail: 'تمت الإضافة بنجاح',
            });
            setTimeout(() => {
              this.router.navigate(['/management/activities']);
            }, 1000);
          }
        },
      });
    else if (this.editMode) {
      console.log(this.formGroup.value);
      this.formGroup.get('id')?.enable();
      this.activityService.updateActivity(this.formGroup.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'تم التحديث  بنجاح',
          });
          this.getActivity();
        },
      });
    }
  }

  formatTime(date: Date | null): string | null {
    if (!date) return null;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  isFileSelected1: boolean = false;

  onFileSelected1(event: any) {
    const files = event.target.files;
    this.isFileSelected1 = !!files.length;
    if (files && files.length > 0 && this.isImage(files)) {
      this.imageName = files[0].name;
      this.uploadImages(Array.from(files));
    }
    else {
      this.messageService.add({
        severity: 'error',
        detail: 'الرجاء تحميل صور بامتدادات مدعومة: jpg, jpeg, png, webp, svg',
      });
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
          this.formGroup.get('posterUrl')?.setValue(uploadedImageUrl);
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

  isImage(file: File): boolean {
    const allowedImageTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
    ];
    return allowedImageTypes.includes(file.type);
  }
}
