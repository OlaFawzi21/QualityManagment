import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { EventService } from 'src/app/_metronic/layout/core/services/web-managment/event.service';
import { ActivityService } from 'src/app/_metronic/layout/core/services/web-managment/activity.service';
import { PlacesService } from 'src/app/_metronic/layout/core/services/places/places.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.scss',
})
export class EditEventComponent {
  private readonly _GeneralService = inject(GeneralService);
  private readonly _PlacesService = inject(PlacesService);
  private readonly cdr = inject(ChangeDetectorRef);

  folderName: any = '';

  formGroup!: FormGroup;
  attractionPlaces: any[] = [];

  event: any = {};

  id: string;
  editMode: boolean;
  first: number = 1;
  rows: number = 100;
  imageName: any;
  param: any;
  @ViewChild('successSwal') successSwal: SwalComponent;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private eventService: EventService,
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
      this.getEvent();
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
      ticketPrice: [null, Validators.required],
      subscriptionUrl: [null, Validators.required],
      eventDates: [[], Validators.required],
      placeId: [null, Validators.required],
    });
    this.getAllPlaces();
  }

  getAllPlaces() {
    this.param = { PageIndex: this.first, PageSize: this.rows };
    this._PlacesService.getAllPlaces(this.param).subscribe({
      next: (res) => {
        this.attractionPlaces = res.body.data;
        this.cdr.detectChanges();
      },
      error: () => {},
    });
  }

  getEvent() {
    this.eventService.getEvent(this.id).subscribe({
      next: (res: any) => {
        this.event = res.data;
        this.imageName = this.event.posterUrl.split('/').pop() || '';

        if (this.event) {
          this.formGroup.patchValue({
            id: this.event.id,
            name: this.event.name,
            description: this.event.description,
            posterUrl: this.event.posterUrl,
            placeId: this.event.placeId,
            ticketPrice: this.event.ticketPrice,
            subscriptionUrl: this.event.subscriptionUrl,
            openingTime: this.convertTimeStringToDate(this.event.openingTime),
            closingTime: this.convertTimeStringToDate(this.event.closingTime),
            eventDates: this.convertToDateArray(this.event.eventDates), // Convert back to Date[]
          });
        }
      },
    });
  }

  convertToDateArray(eventDates: string | string[]): Date[] {
    if (!eventDates) return [];

    if (Array.isArray(eventDates)) {
      return eventDates.map((date) => new Date(date));
    }

    return [new Date(eventDates)]; // If it's a single date string, wrap it in an array
  }

  // convertDateStringToDate(dateStrings: string[] | string): Date[] {
  //   if (!dateStrings) return [];
  //   if (!Array.isArray(dateStrings)) return [new Date(dateStrings)];
  //   return dateStrings.map((dateStr) => new Date(dateStr));
  // }
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

    // Retrieve selected dates from form
    let selectedDates: Date[] = this.formGroup.get('eventDates')?.value || [];

    // Convert to properly formatted date strings
    const formattedEventDates = selectedDates.map((date) => {
      return date instanceof Date
        ? `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        : '';
    });

    // Set the formatted dates back into the form before submitting
    this.formGroup.get('eventDates')?.setValue(formattedEventDates);

    if (!this.editMode) {
      this.eventService.createEvent(this.formGroup.value).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.messageService.add({
              severity: 'success',
              detail: 'تمت الإضافة بنجاح',
            });
            setTimeout(() => {
              this.router.navigate(['/management/events']);
            }, 1000);
          }
        },
      });
    } else {
      this.formGroup.get('id')?.enable();
      this.eventService.updateEvent(this.formGroup.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'تم التحديث بنجاح',
          });
          this.getEvent(); // Refresh event data
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
  formatDate(date: Date | Date[] | null): string | string[] | null {
    if (!date) return null;

    if (Array.isArray(date)) {
      return date.map((d) =>
        d instanceof Date ? d.toISOString().split('T')[0] : ''
      );
    }

    return date instanceof Date ? date.toISOString().split('T')[0] : '';
  }

  isFileSelected1: boolean = false;

  onFileSelected1(event: any) {
    const files = event.target.files;
    this.isFileSelected1 = !!files.length;
    if (files && files.length > 0 && this.isImage(files)) {
      this.imageName = files[0].name;
      this.uploadImages(Array.from(files));
    } else {
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
