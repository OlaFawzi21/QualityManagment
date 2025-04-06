import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { AboutUsService } from 'src/app/_metronic/layout/core/services/web-managment/about-us.service';
import { environment } from 'src/environments/environment';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-introduce-video',
  templateUrl: './introduce-video.component.html',
  styleUrl: './introduce-video.component.scss',
})
export class IntroduceVideoComponent {
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AboutUsService = inject(AboutUsService);
  private readonly _GeneralService = inject(GeneralService);
  private readonly cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);
  assets = environment.assets;
  isFileSelected1: boolean = false;
  videoForm: FormGroup;
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
  };
  ngOnInit() {
    this.initialVideoForm();
    this.getMainVideo();
  }

  initialVideoForm(): void {
    this.videoForm = this._FormBuilder.group({
      video: ['', [Validators.required]],
    });
  }

  onFileSelected1(event: any) {
    const file = event.target.files[0];
    if (file && this.isVideoAccepted(file)) {
      this.uploadVideo(file);
    } else {
      this.messageService.add({
        severity: 'error',
        detail: 'الرجاء تحميل فيديو بامتداد مدعوم: mp4',
      });
    }
  }
  uploadedVideo: any;
  uploadVideo(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this._GeneralService.uploadFile(formData, 'VideosFolder').subscribe({
      next: (response: any) => {
        try {
          const parsedResponse =
            typeof response === 'string' ? JSON.parse(response) : response;
          console.log(parsedResponse);

          // قم بدمج baseUrl مع المسار المستلم:
          this.uploadedVideo = `${this.assets}${parsedResponse.data.url}`;
          console.log(this.uploadedVideo);
          this.videoForm.get('video')?.setValue(this.uploadedVideo);
          this.successSwal.fire();
        } catch (e) {
          console.error('Error parsing response:', e);
          // this.toastr.error('خطأ في تحليل رد السيرفر.');
        }
      },
      error: (error) => {
        console.error('Error during video upload:', error);
        // this.toastr.error('فشل رفع الفيديو.');
      },
    });
  }

  isVideoAccepted(file: File): boolean {
    // تحقق من النوع والحجم (بحد أقصى 5 ميجا بايت)
    const isMp4 = file.type === 'video/mp4';
    // const isSizeValid = file.size <= 5 * 1024 * 1024; // 5 ميجا بايت
    return isMp4;
  }
  selectedFile: any;
  videoName: any;
  getMainVideo(): void {
    this._AboutUsService.getMainVideo().subscribe({
      next: (response) => {
        this.videoForm.patchValue({
          video: response.body.data || '',
        });
        console.log(this.videoForm.value);

        this.selectedFile = response.body.data;
        if (response.body.data) {
          this.videoName = response.body.data.split('/').pop() || '';
        }
        this.isFileSelected1 = !!response.body.data;
        this.cdr.detectChanges();
      },
    });
  }
  updateMainVideo(): void {
    console.log(this.videoForm.get('video')?.value);

    this._AboutUsService
      .updateMainVideo(this.videoForm.get('video')?.value)
      .subscribe({
        next: (response) => {
          this.successSwal.fire().then(() => {
            this.getMainVideo();
          });
        },
        error: (error) => {
          console.error('خطأ أثناء التحديث', error);
        },
      });
  }
}
