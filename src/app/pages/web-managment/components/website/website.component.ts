import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { PlacesService } from 'src/app/_metronic/layout/core/services/places/places.service';
import { WebsiteService } from 'src/app/_metronic/layout/core/services/web-managment/website.service';
import { environment } from 'src/environments/environment';
import { SweetAlertOptions } from 'sweetalert2';
@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrl: './website.component.scss',
})
export class WebsiteComponent {
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('successSwal2') successSwal2: SwalComponent;
  @ViewChild('successSwal3') successSwal3: SwalComponent;
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _WebsiteService = inject(WebsiteService);
  private readonly _GeneralService = inject(GeneralService);
  private readonly _PlacesService = inject(PlacesService);
  private readonly cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);

  assets = environment.assets;
  websiteFormGroup: FormGroup;
  mobileFormGroup: FormGroup;
  socialMediaForm: FormGroup;
  isFileSelected1: boolean = false;
  isFileSelected2: boolean = false;
  imagesList: any[] = [];
  attractionPlaces: any[] = [];
  phoneImage: any;
  data: any;
  imageName: any = '';
  first: number = 1;
  rows: number = 100;
  param: any;
  selectedFile!: any;
  url: any;
  setPlaceholder() {
    setTimeout(() => {
      const editor = document.querySelector('.ql-editor');
      if (editor) {
        editor.setAttribute('data-placeholder', 'كلمة الترحيب');
      }
    }, 100);
  }
  id: string;
  editMode: boolean;
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  };

  triggerDelete() {
    this.successSwal.fire();
  }

  openDeleteSwal() {
    this.deleteSwal.fire();
  }
  constructor() {
    if (this.data?.length) {
      this.data = this.data.map((item: { description: string }) => ({
        ...item,
        description: item?.description
          ? this.stripHtmlTags(item.description)
          : '',
      }));
      this.cdr.detectChanges();
    }
  }
  ngOnInit() {
    this.getMainPageIntro();
    this.getDownloadappInfo();
    this.initialAboutHailForm();
    this.initialMobileForm();
    this.socialMediaForm = this._FormBuilder.group({
      socialMedia: this._FormBuilder.array([
        this.createContact(), // Initialize with one contact
      ]),
    });
    this.getAllPlaces();
  }
  ngOnChanges(): void {
    if (this.data?.length) {
      this.data = this.data.map((item: { description: string }) => ({
        ...item,
        description: item?.description
          ? this.stripHtmlTags(item.description)
          : '',
      }));
      this.cdr.detectChanges();
    }
  }

  stripHtmlTags(html: string): string {
    if (!html) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    this.cdr.detectChanges();
    return doc.body.textContent || '';
  }

  // initialAboutHailForm(): void {
  //   this.websiteFormGroup = this._FormBuilder.group({
  //     titleAr: ['', Validators.required],
  //     titleEn: ['default', Validators.required],
  //     descriptionAr: ['', Validators.required],
  //     descriptionEn: ['default', Validators.required],
  //     urls: this._FormBuilder.array([]),
  //   });
  // }

  initialAboutHailForm(): void {
    this.websiteFormGroup = this._FormBuilder.group({
      titleAr: ['', Validators.required],
      titleEn: ['default', Validators.required],
      descriptionAr: ['', Validators.required],
      descriptionEn: ['default', Validators.required],
      url: ['', Validators.required],
      placeId: [null, Validators.required],
    });
  }

  initialMobileForm() {
    this.mobileFormGroup = this._FormBuilder.group({
      titleAr: ['', Validators.required],
      titleEn: ['default', Validators.required],
      descriptionAr: ['', Validators.required],
      descriptionEn: ['default', Validators.required],
      image: ['', Validators.required],
      socialMedia: this._FormBuilder.array([]),
    });
  }

  get socialMedia() {
    return this.socialMediaForm.get('socialMedia') as FormArray;
  }

  // Create a contact FormGroup
  createContact(): FormGroup {
    return this._FormBuilder.group({
      linkName: [''],
      linkUrl: [''],
    });
  }

  // Add a contact
  addContact(): void {
    this.socialMedia.push(this.createContact());
  }

  // Remove a contact
  removeContact(index: number): void {
    this.socialMedia.removeAt(index);
  }

  onFileSelected1(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isFileSelected1 = !!input?.files?.length;
  }

  onFileSelected2(event: any): void {
    const files = event.target.files;
    this.cdr.detectChanges();

    const filesArray: File[] = Array.from(files);
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'mp4'];

    const validFiles = filesArray.filter((file: any) => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      return fileExtension && allowedExtensions.includes(fileExtension);
    });

    if (validFiles.length === 0) {
      this.messageService.add({
        severity: 'error',
        detail:
          'الرجاء تحميل صور أو فيديو بتنسيق مدعوم: jpg, jpeg, png, webp, svg, mp4',
      });
      return;
    }

    if (files && files.length > 0) {
      this.imageName = files[0].name;
      this.uploadImage(Array.from(files));
      this.cdr.detectChanges();
    }
  }

  onImagesSelected(event: any) {
    const files = event.target.files;

    const filesArray: File[] = Array.from(files);
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'mp4'];

    const validFiles = filesArray.filter((file: any) => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      return fileExtension && allowedExtensions.includes(fileExtension);
    });

    if (validFiles.length === 0) {
      this.messageService.add({
        severity: 'error',
        detail:
          'الرجاء تحميل صور أو فيديو بتنسيق مدعوم: jpg, jpeg, png, webp, svg, mp4',
      });
      return;
    }

    if (files && files.length > 0) {
      this.imageName = files[0].name;
      console.log(this.imageName);

      this.uploadImages(Array.from(files));
      this.cdr.detectChanges();
    }
  }

  uploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    this._GeneralService.uploadImage(formData, 'images').subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);
        if (response.body) {
          console.log(response.body);
          let assets = environment.assets;
          // const newImages = response.body.data.map(
          //   (url: string) => `${assets}${url}`
          // );

          this.url = `${assets}${response.body.data[0]}`;
          console.log(this.url);

          this.websiteFormGroup.get('url')?.setValue(response.body.data[0]);
          this.cdr.detectChanges();
          this.successSwal3.fire();
          // this.imagesList.push(...newImages);
          console.log('تم رفع الصور بنجاح!');
          // this.abouHailForm.get('image')?.setValue(response.body.data[0]);
          this.cdr.detectChanges();
        }
      },
      error: () => {
        console.log('فشل رفع الصور.');
      },
    });
  }

  folderName: any = '';
  uploadImage(files: File[]) {
    this.folderName = this.imageName;
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    this._GeneralService.uploadImage(formData, this.folderName).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);

        if (response.body) {
          console.log('تم رفع الصور بنجاح!');
          this.mobileFormGroup.get('image')?.setValue(response.body.data[0]);
          this.cdr.detectChanges();
        }
      },
      error: () => {
        console.log('فشل رفع الصور.');
      },
    });
  }
  // removeImage(index: number) {
  //   this.imagesList.splice(index, 1);
  // }
  removeData(id: any): void {
    this._WebsiteService.deleteMainPageIntro(id).subscribe({
      next: (res) => {
        console.log(res);
        this.successSwal2.fire().then(() => {
          this.getMainPageIntro();
        });
      },
      error: () => {},
    });
  }
  getMainPageIntro(): void {
    this._WebsiteService.getMainPageIntro().subscribe({
      next: (response) => {
        this.imagesList = response.body.data.urls;
        this.data = response.body.data;
        console.log(this.imagesList);
        if (this.data?.length) {
          this.data = this.data.map((item: { description: string }) => ({
            ...item,
            description: item?.description
              ? this.stripHtmlTags(item.description)
              : '',
          }));
          this.cdr.detectChanges();
        }
        // this.websiteFormGroup.patchValue({
        //   titleAr: this.data.title || '',
        //   descriptionAr: this.data.description || '',
        //   url: this.imagesList,
        // });
        // const urlsArray = this.websiteFormGroup.get('url') as FormArray;
        // urlsArray.clear(); // مسح القديم قبل التحديث

        // this.imagesList.forEach((imageUrl) => {
        //   urlsArray.push(new FormControl(imageUrl));
        // });
        console.log(this.data);

        this.cdr.detectChanges();
        // const editorElement = document.querySelector('.ql-editor');
        // if (editorElement) {
        //   editorElement.innerHTML = response.body.data.description || '';
        // }
      },
    });
  }

  getDownloadappInfo(): void {
    this._WebsiteService.getDownloadappInfo().subscribe({
      next: (response: any) => {
        console.log(response);
        // Clear existing contacts
        this.socialMedia.clear();
        // Loop over subIndicator.partials and add new contacts
        response.body.data.socialMedia.forEach((social: any) => {
          this.socialMedia.push(this.createContact()); // Add a new FormGroup
          this.socialMedia
            .at(this.socialMedia.length - 1)
            .patchValue({ linkName: social.linkName }); // Update the last added FormGroup
          this.socialMedia
            .at(this.socialMedia.length - 1)
            .patchValue({ linkUrl: social.linkUrl }); // Update the last added FormGroup
        });
        this.mobileFormGroup.patchValue({
          titleAr: response.body.data.title || '',
          descriptionAr: response.body.data.description || '',
          image: response.body.data.image || '',
        });
        console.log(this.mobileFormGroup.value);
        this.selectedFile = response.body.data.image;
        if (response.body.data.image) {
          this.imageName = response.body.data.image.split('/').pop() || '';
        }
        this.isFileSelected2 = !!response.body.data.image;
        this.cdr.detectChanges();
        const editorElement = document.querySelector('.mob .ql-editor');
        if (editorElement) {
          editorElement.innerHTML = response.body.data.description || '';
        }
      },
    });
  }

  submitForm(): void {
    console.log(this.websiteFormGroup.value);
    this._WebsiteService
      .updateMainPageIntro(this.websiteFormGroup.value)
      .subscribe({
        next: (response) => {
          this.successSwal.fire().then(() => {
            this.getMainPageIntro();
          });
        },
        error: (error) => {
          console.error('خطأ أثناء التحديث', error);
        },
      });
  }

  addSocialMedia() {
    const socialGroup = this._FormBuilder.group({
      linkName: ['', Validators.required],
      linkUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
    this.socialMedia.push(socialGroup);
  }

  removeSocialMedia(index: number) {
    this.socialMedia.removeAt(index);
  }

  submitMobileForm() {
    if (this.mobileFormGroup.invalid) {
      console.log('النموذج غير صالح!');
    } else {
      const socialMediaArray = this.mobileFormGroup.get(
        'socialMedia'
      ) as FormArray;
      socialMediaArray.clear();
      this.socialMedia.getRawValue().forEach((item: any) => {
        socialMediaArray.push(this._FormBuilder.group(item));
      });
      this._WebsiteService
        .updateDownLoadappInfo(this.mobileFormGroup.value)
        .subscribe({
          next: (response) => {
            this.successSwal.fire().then(() => {
              this.getDownloadappInfo();
            });
          },
          error: (error) => {
            console.error('خطأ أثناء التحديث', error);
          },
        });
    }
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
}
