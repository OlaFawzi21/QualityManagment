import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { AboutUsService } from 'src/app/_metronic/layout/core/services/web-managment/about-us.service';
import { environment } from 'src/environments/environment';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-about-hail',
  templateUrl: './about-hail.component.html',
  styleUrl: './about-hail.component.scss',
})
export class AboutHailComponent {
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AboutUsService = inject(AboutUsService);
  private readonly _GeneralService = inject(GeneralService);
  private readonly cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);

  assets = environment.assets;
  html: any = '';
  abouHailForm!: FormGroup;
  folderName: any = '';
  imagesList: string[] = [];
  imagesForUpload: any[] = [];
  abouHail: any = {};
  isFileSelected1: boolean = false;
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
  };

  ngOnInit() {
    this.initialAboutHailForm();
    this.getAboutHail();
  }

  imageName: any;
  selectedFile: File | null = null;

  // onFileSelected1(event: any): void {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     this.isFileSelected1 = true;
  //     this.imageName = files[0].name; // عرض اسم الملف الجديد المختار
  //     this.selectedFile = files[0]; // تخزين الملف في متغير منفصل
  //     this.uploadImage(Array.from(files));
  //   }
  // }
  initialAboutHailForm(): void {
    this.abouHailForm = this._FormBuilder.group({
      titleAr: ['', [Validators.required]],
      titleEn: ['default', [Validators.required]],
      descriptionAr: ['', [Validators.required]],
      descriptionEn: ['default', [Validators.required]],
      image: [null, [Validators.required]],
    });
  }
  get titleAr() {
    return this.abouHailForm.get('titleAr');
  }

  // uploadImage(files: File[]) {
  //   this.folderName = this.imageName;
  //   const formData = new FormData();
  //   files.forEach((file) => formData.append('files', file));
  //   this._GeneralService.uploadImage(formData, this.folderName).subscribe({
  //     next: (response: HttpResponse<any>) => {
  //       if (response.body) {
  //         this.imagesForUpload.push(...response.body);
  //         const newImages = response.body.map(
  //           (url: string) => `${this.assets}${url}`
  //         );
  //         console.log(newImages);
  //         this.imagesList.push(...newImages);
  //       }
  //       console.log();

  //       console.log('تم رفع الصور بنجاح!');
  //     },
  //     error: () => {
  //       console.log('فشل رفع الصور.');
  //     },
  //   });
  // }
  getAboutHail(): void {
    this._AboutUsService.getAboutHail().subscribe({
      next: (response) => {
        this.abouHail = response.body.data;
        this.imagesList = this.abouHail.image;
        console.log(this.imagesList);
        setTimeout(() => {
          this.abouHailForm.patchValue({
            titleAr: this.abouHail.title || '',
            descriptionAr: this.abouHail.description || '',
            image: this.abouHail.image || '',
          });
          this.cdr.detectChanges();
          const editorElement = document.querySelector('.ql-editor');
          if (editorElement) {
            editorElement.innerHTML = this.abouHail.description || '';
          }
        }, 200);
        this.html = this.abouHail.description;
        this.selectedFile = this.abouHail.image;
        if (this.abouHail.image) {
          this.imageName = this.abouHail.image.split('/').pop() || '';
        }
        this.isFileSelected1 = !!this.abouHail.image;
        this.cdr.detectChanges();
      },
    });
  }

  onFileSelected1(event: any) {
    const files = event.target.files;
    this.cdr.detectChanges();
    if (files && files.length > 0 && this.isImage(files)) {
      this.imageName = files[0].name;
      this.uploadImages(Array.from(files));
      this.cdr.detectChanges();
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

        if (response.body) {
          let assets = environment.assets;
          // const newImages = response.body.data.map(
          //   (url: string) => `${assets}${url}`
          // );
          // this.imagesList.push(...newImages);
          console.log('تم رفع الصور بنجاح!');
          this.abouHailForm.get('image')?.setValue(response.body.data[0]);
          this.cdr.detectChanges();
        }
      },
      error: () => {
        console.log('فشل رفع الصور.');
      },
    });
  }
  updateAboutHail(): void {
    console.log(this.abouHailForm.value);

    this._AboutUsService.updateAboutHail(this.abouHailForm.value).subscribe({
      next: (response) => {
        this.successSwal.fire().then(() => {
          this.getAboutHail();
        });
      },
      error: (error) => {
        console.error('خطأ أثناء التحديث', error);
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
