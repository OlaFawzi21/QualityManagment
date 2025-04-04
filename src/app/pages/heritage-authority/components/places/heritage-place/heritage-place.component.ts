import { HttpResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { PlacesService } from 'src/app/_metronic/layout/core/services/places/places.service';
import { environment } from 'src/environments/environment';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-heritage-place',
  templateUrl: './heritage-place.component.html',
  styleUrl: './heritage-place.component.scss',
})
export class HeritagePlaceComponent {
  formGroup!: FormGroup;
  @ViewChild('successSwal2') successSwal2: SwalComponent;
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('successSwal') successSwal: SwalComponent;
  private readonly _GeneralService = inject(GeneralService);
  tourGuideEnabled = new FormControl(false);
  id: string;
  editMode: boolean;
  placeDetails: any = {};
  isFileSelected1: boolean = false;
  isFileSelected2: boolean = false;
  isFileSelected3: boolean = false;
  isFileSelected4: boolean = false;
  trans: any = [];
  airports: any = [];
  attractions: any = [];
  governments: any = [];
  imagesList: any[] = [];
  videoName: any = '';
  imageName: any = '';
  uploadedVideoOrImage: any;
  uploadedAudio: any;
  uploadedVideo: any;
  uploadedPdf: any;
  pdfs: any[] = [];
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
  };

  types: any[] = [
    {
      label: 'تاريخي',
      value: 0,
      icon: 'assets/images/icons/Group-2.svg',
    },
    {
      label: 'أثري',
      value: 1,
      icon: 'assets/images/img/erth.svg',
    },
    {
      label: 'ثقافي',
      value: 2,
      icon: 'assets/images/icons/Vector-2.svg',
    },
    {
      label: 'طبيعي',
      value: 3,
      icon: 'assets/images/img/gabal.svg',
    },
    {
      label: 'ديني',
      value: 4,
      icon: 'assets/images/img/mosque.svg',
    },
  ];

  types2: any[] = [
    {
      label: 'ترميم',
      value: 0,
    },
    {
      label: 'صيانه',
      value: 1,
    },
    {
      label: 'لا يوجد',
      value: 2,
    },
  ];

  categories: any[] = [
    { name: 'موقف سيارات', key: 'hasParking', value: true },
    { name: 'طرق ممهده', key: 'hasPavedRoads', value: true },
    { name: 'استراحات', key: 'hasRestAreas', value: true },
    { name: 'مرافق عامه', key: 'hasPublicFacilities', value: true },
  ];

  private L: any;
  private map: any;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.route.params.subscribe({
      next: ({ id }) => {
        this.id = id;
      },
    });
    if (this.id) {
      this.editMode = true;
      this.getPlace();
    } else {
      this.editMode = false;
    }

    this.formGroup = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: ['', [Validators.required]],
      region: [''],
      governateId: [null, Validators.required],
      classification: [null, Validators.required],
      description: ['', Validators.required],
      creationDate: ['', Validators.required],
      hasParking: [false],
      hasPublicFacilities: [false],
      hasRestAreas: [false],
      hasPavedRoads: [false],
      restorationAndMaintenance: [null, Validators.required],
      coordinates: this.fb.group({
        latitude: [null, Validators.required],
        longitude: [null, Validators.required],
      }),
      _360ViewUrl: [''],
      vrUrl: [''],
      audioUrl: [''],
      qrCode: [''],
      images: [[], Validators.required],
      video: [''],
      nearestCity: ['', Validators.required],
      historicalInfo: ['', Validators.required],
      siteLinkAttractions: [[]],
      siteLinkTransportations: [[]],
      airports: [[]],
      totalArea: [null, Validators.required],
      bestSeason: ['', Validators.required],
      visitingHours: ['', Validators.required],
      ticketPrice: [null],
      subscriptionUrl: [''],
      transportationId: [null],
      transportationUrl: [''],
      suitableClothes: ['', Validators.required],
      tourGuideUrl: [''],
      safetyInfo: this.fb.group({
        description: ['', Validators.required],
        title: ['', Validators.required],
        mediaUrl: ['', Validators.required],
      }),
      isTopSite: [false],
      myths: [''],
      constructionDate: [null],
      researches: this.fb.array([]),
      emergencyContacts: this.fb.array([]),
    });
  }

  createResearchGroup(): FormGroup {
    return this.fb.group({
      title: [''],
      url: [''],
    });
  }

  createEmergencyContactGroup(): FormGroup {
    return this.fb.group({
      name: [''],
      phoneNumber: [''],
    });
  }

  get emergencyContacts() {
    return this.formGroup.get('emergencyContacts') as FormArray;
  }

  addContact(): void {
    this.emergencyContacts.push(this.createEmergencyContactGroup());
  }

  removeContact(index: number): void {
    this.emergencyContacts.removeAt(index);
  }

  get researches() {
    return this.formGroup.get('researches') as FormArray;
  }

  addResearch(): void {
    this.researches.push(this.createResearchGroup());
  }

  removeResearch(index: number): void {
    this.researches.removeAt(index);
  }

  ngOnInit() {
    if (this.formGroup.get('tourGuideUrl')?.value) {
      this.tourGuideEnabled.setValue(true);
    } else {
      this.tourGuideEnabled.setValue(false);
    }
    this.change();
    this.getGovernments();
    this.getTrans();
    this.getAirports();
    this.getAttractions();
  }

  async showMap() {
    this.cdr.detectChanges();
    if (!this.L) this.L = await import('leaflet');
    if (!this.mapContainer) {
      const observer = new MutationObserver((mutations, obs) => {
        if (this.mapContainer?.nativeElement) {
          obs.disconnect(); // Stop observing once found
          this.initMap();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      return;
    }
    this.initMap();
  }
  private marker: any;
  private initMap(): void {
    if (!this.mapContainer?.nativeElement || !this.L) return;

    if (this.map) this.map.remove();

    const hailRegionBounds = this.L.latLngBounds(
      this.L.latLng(27.2, 41.5),
      this.L.latLng(28.2, 42.8)
    );

    this.map = this.L.map(this.mapContainer.nativeElement, {
      center: [15, 18],
      zoom: 10,
      minZoom: 10,
      maxZoom: 15,
      maxBounds: hailRegionBounds,
      maxBoundsViscosity: 1.0,
    });

    this.L.tileLayer('http://www.google.cn/maps/vt?lyrs=m&x={x}&y={y}&z={z}', {
      attribution: '© Google Maps',
      opacity: 1.0,
    }).addTo(this.map);

    const lat = this.formGroup.get('coordinates.latitude')?.value;
    const lng = this.formGroup.get('coordinates.longitude')?.value;

    if (lat && lng) {
      this.getPlaceName(lat, lng).then((placeName) => {
        this.addMarker(lat, lng, placeName);
        this.map.setView([lat, lng], 12);
      });
    }

    this.map.on('click', async (event: any) => {
      if (!hailRegionBounds.contains(event.latlng)) {
        console.warn('Click outside Hail region ignored.');
        return;
      }

      let lat = event.latlng.lat;
      let lng = event.latlng.lng;

      const placeName = await this.getPlaceName(lat, lng);
      this.formGroup.patchValue({
        coordinates: {
          latitude: lat,
          longitude: lng,
        },
      });

      this.addMarker(lat, lng, placeName);
    });
  }
  private addMarker(lat: number, lng: number, placeName: string): void {
    if (!this.L || !this.map) return;

    // Remove the previous marker if it exists
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Create a new marker with a pin icon
    this.marker = this.L.marker([lat, lng], {
      icon: this.L.icon({
        iconUrl: '../../../../../assets/images/img/icons8-map-pin-20.png', // Your custom pin icon

        iconAnchor: [15, 18], // Point of the icon that should be on the location
        popupAnchor: [-5, -40], // Where the popup should appear
      }),
    }).addTo(this.map);

    // Add a popup to the marker
    this.marker
      .bindPopup(
        `<b>${placeName}</b><br>Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
      )
      .openPopup();
  }

  private async getPlaceName(lat: number, lng: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || 'موقع غير معروف';
    } catch {
      return 'موقع غير معروف';
    }
  }

  private showPopup(lat: number, lng: number, placeName: string): void {
    if (!this.L || !this.map) return;

    this.L.popup()
      .setLatLng([lat, lng])
      .setContent(
        `<b>${placeName}</b><br> Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
      )
      .openOn(this.map);
  }

  getPlace() {
    this.placesService.getPlace(this.id).subscribe({
      next: (res: any) => {
        this.placeDetails = res.data;
        console.log('API Response:', this.placeDetails);
        if (this.placeDetails) {
          this.formGroup.patchValue(this.placeDetails);
          const apiConstructionDate =
            this.formGroup.get('constructionDate')?.value;
          this.formGroup.patchValue({
            constructionDate: new Date(apiConstructionDate),
          });

          if (this.formGroup.get('tourGuideUrl')?.value) {
            this.tourGuideEnabled.setValue(true);
          } else {
            this.tourGuideEnabled.setValue(false);
          }
          this.change();

          if (
            this.placeDetails.researches &&
            Array.isArray(this.placeDetails.researches)
          ) {
            const researchesArray = this.formGroup.get(
              'researches'
            ) as FormArray;
            researchesArray.clear();
            this.placeDetails.researches.forEach((research: any) => {
              researchesArray.push(
                this.fb.group({
                  title: [research.title],
                  url: [research.url],
                })
              );
            });
          }

          if (
            this.placeDetails.emergencyContacts &&
            Array.isArray(this.placeDetails.emergencyContacts)
          ) {
            const emergencyArray = this.formGroup.get(
              'emergencyContacts'
            ) as FormArray;
            emergencyArray.clear();
            this.placeDetails.emergencyContacts.forEach((contact: any) => {
              emergencyArray.push(
                this.fb.group({
                  name: [contact.name],
                  phoneNumber: [contact.phoneNumber],
                })
              );
            });
          }
          this.imagesList = this.formGroup.get('images')?.value;
          this.uploadedVideo = this.formGroup.get('video')?.value;
          this.uploadedAudio = this.formGroup.get('audioUrl')?.value;
          this.uploadedVideoOrImage = this.formGroup.get(
            'safetyInfo.mediaUrl'
          )?.value;
          this.pdfs = this.formGroup.get('researches')?.value;
          console.log('Form Value After Patch:', this.formGroup.value);
          this.videoName = this.placeDetails.video.split('/').pop() || '';
        }
      },
    });
  }

  getTrans() {
    this.placesService.transDropDown().subscribe({
      next: (res) => {
        this.trans = res.data;
      },
    });
  }

  getAirports() {
    this.placesService.airportsDropDown().subscribe({
      next: (res) => {
        this.airports = res.data;
      },
    });
  }

  getAttractions() {
    this.placesService.attractionsDropDown().subscribe({
      next: (res) => {
        this.attractions = res.data;
      },
    });
  }

  getGovernments() {
    this.placesService.governmentsDropDown().subscribe({
      next: (res) => {
        this.governments = res.data;
        this.cdr.detectChanges();
      },
    });
  }

  change() {
    this.tourGuideEnabled.value
      ? this.formGroup.get('tourGuideUrl')?.enable()
      : this.formGroup.get('tourGuideUrl')?.disable();
  }

  submitPlace() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.logInvalidFields();
      console.log(this.formGroup);
      return;
    }

    this.formGroup
      .get('constructionDate')
      ?.setValue(
        new Date(this.formGroup.get('constructionDate')?.value)
          .toISOString()
          .split('.')[0]
      );

    if (this.editMode) {
      this.formGroup.get('id')?.enable();
      this.placesService.updatePlace(this.formGroup.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.isSuccess) {
            this.successSwal.fire().then(() => {
              this.router.navigate(['/places']);
            });
          }
        },
      });
    } else {
      this.placesService.addPlace(this.formGroup.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.isSuccess) {
            this.successSwal.fire().then(() => {
              this.router.navigate(['/places']);
            });
          }
        },
      });
    }
  }

  onImagesSelected(event: any) {
    const files = event.target.files;
    this.isFileSelected1 = !!files.length;
    if (files && files.length > 0) {
      this.uploadImages(Array.from(files));
    } else {
      this.formGroup.get('images')?.setErrors({ required: true });
    }
  }

  uploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    this._GeneralService.uploadImage(formData, 'images').subscribe({
      next: (response: HttpResponse<any>) => {
        try {
          console.log(response);
          if (response.body.data) {
            let assets = environment.assets;
            const newImages = response.body.data.map(
              (url: string) => `${assets}${url}`
            );
            this.imagesList.push(...newImages);
            console.log('imagesList', this.imagesList);
            this.formGroup.patchValue({ images: this.imagesList });
            this.successSwal2.fire();
            this.cdr.detectChanges();
          }
        } catch (e) {
          this.deleteSwal.fire();
        }
      },
      error: () => {
        this.deleteSwal.fire();
      },
    });
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    this.isFileSelected2 = !!file;
    if (file && this.isVideoAccepted(file)) {
      this.uploadVideo(file);
    } else {
      // this.toastr.error('الفيديو المرفوع غير مدعوم.');
      // this.videoInput.nativeElement.value = '';
    }
  }

  uploadVideo(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this._GeneralService.uploadFile(formData, 'VideosFolder').subscribe({
      next: (response: any) => {
        try {
          let assets = environment.assets;
          const parsedResponse =
            typeof response === 'string' ? JSON.parse(response) : response;
          // قم بدمج baseUrl مع المسار المستلم:
          this.uploadedVideo = '';
          this.uploadedVideo = `${assets}${parsedResponse.data.url}`;
          console.log(this.uploadedVideo);
          this.cdr.detectChanges();
          this.formGroup.get('video')?.setValue(this.uploadedVideo);
          // this.toastr.success('تم رفع الفيديو بنجاح!');
          this.successSwal2.fire();
        } catch (e) {
          this.deleteSwal.fire();
          console.error('Error parsing response:', e);
          // this.toastr.error('خطأ في تحليل رد السيرفر.');
        }
      },
      error: (error) => {
        this.deleteSwal.fire();
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

  onAudioSelected(event: any) {
    const file = event.target.files[0];
    this.isFileSelected3 = !!file;
    if (file) {
      this.uploadAudio(file);
    } else {
      // this.toastr.error('الفيديو المرفوع غير مدعوم.');
      // this.videoInput.nativeElement.value = '';
    }
  }

  uploadAudio(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this._GeneralService.uploadFile(formData, 'auidoFolder').subscribe({
      next: (response: any) => {
        try {
          let assets = environment.assets;
          const parsedResponse =
            typeof response === 'string' ? JSON.parse(response) : response;
          // قم بدمج baseUrl مع المسار المستلم:
          this.uploadedAudio = '';
          this.uploadedAudio = `${assets}${parsedResponse.data.url}`;
          console.log(this.uploadedAudio);
          this.cdr.detectChanges();
          this.formGroup.get('audioUrl')?.setValue(this.uploadedAudio);
          this.successSwal2.fire();
        } catch (e) {
          console.error('Error parsing response:', e);
          this.deleteSwal.fire();
          // this.toastr.error('خطأ في تحليل رد السيرفر.');
        }
      },
      error: (error) => {
        this.deleteSwal.fire();
        console.error('Error during audio upload:', error);
        // this.toastr.error('فشل رفع الفيديو.');
      },
    });
  }

  onVideoOrImageSelected(event: any) {
    const file = event.target.files[0];
    this.isFileSelected4 = !!file;
    if (file) {
      this.uploadVideoOrImage(file);
    } else {
      // this.toastr.error('الفيديو المرفوع غير مدعوم.');
      // this.videoInput.nativeElement.value = '';
    }
  }

  uploadVideoOrImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this._GeneralService.uploadFile(formData, 'VideoOrImageFolder').subscribe({
      next: (response: any) => {
        try {
          let assets = environment.assets;
          const parsedResponse =
            typeof response === 'string' ? JSON.parse(response) : response;
          this.uploadedVideoOrImage = '';
          this.uploadedVideoOrImage = `${assets}${parsedResponse.data.url}`;
          console.log(this.uploadedVideoOrImage);
          this.cdr.detectChanges();
          this.formGroup
            .get('safetyInfo.mediaUrl')
            ?.setValue(this.uploadedVideoOrImage);
          this.successSwal2.fire();
        } catch (e) {
          console.error('Error parsing response:', e);
        }
      },
      error: (error) => {
        this.deleteSwal.fire();
        // console.error('Error during video upload:', error);
        // this.toastr.error('فشل رفع الفيديو.');
      },
    });
  }

  onPdfSelected(event: any, i: number) {
    const file = event.target.files[0];
    if (file) {
      this.uploadPdf(file, i);
    }
  }

  uploadPdf(file: File, index: number) {
    const formData = new FormData();
    formData.append('file', file);
    this._GeneralService.uploadFile(formData, 'pdfFolder').subscribe({
      next: (response: any) => {
        try {
          let assets = environment.assets;
          const parsedResponse =
            typeof response === 'string' ? JSON.parse(response) : response;

          if (parsedResponse?.data?.url) {
            this.uploadedPdf = `${assets}${parsedResponse.data.url}`;
            // this.researches.get('url')?.setValue(this.uploadedPdf);
            (this.formGroup.get('researches') as FormArray)
              .at(index)
              .patchValue({
                url: this.uploadedPdf,
              });
            this.successSwal2.fire();
            this.cdr.detectChanges();
          } else {
            throw new Error('Invalid response structure');
          }
        } catch (e) {
          console.error('Error parsing response:', e);
          this.deleteSwal.fire();
        }
      },
    });
  }

  fieldLabels: { [key: string]: string } = {
    name: 'اسم المزار',
    governateId: 'المنطقة أو المحافظة',
    classification: 'نوع المزار',
    description: 'ملخص عن الموقع و أهميته',
    creationDate: 'تاريخ الإنشاء أو الاكتشاف',
    restorationAndMaintenance: 'الصيانة',
    latitude: 'خط العرض',
    longitude: 'خط الطول',
    images: ' إضافة صور المزار',
    nearestCity: 'المسافه من أقرب مدينه',
    historicalInfo: 'المعلومات التاريخية و الثقافية',
    totalArea: 'المساحة الإجمالية',
    bestSeason: 'أفضل وقت للزيارة',
    visitingHours: 'ساعات الزيارة',
    suitableClothes: 'الزي المناسب',
    safetyInfoDescription: 'إرشادات الأمن و السلامة',
    safetyInfoTitle: 'عنوان الأمن و السلامة',
    safetyInfoMediaUrl: 'إضافة فيديو أو صورة للأمن و السلامة',
  };

  missingRequiredFields: string[] = [];

  logInvalidFields() {
    this.missingRequiredFields = [];
    Object.keys(this.formGroup.controls).forEach((key) => {
      const control = this.formGroup.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((nestedKey) => {
          const nestedControl = control.get(nestedKey);
          if (nestedControl?.invalid && nestedControl?.hasError('required')) {
            // ✅ هنا نستخدم `safetyInfoTitle` بدلاً من `title`
            const fullKey =
              key === 'safetyInfo'
                ? `safetyInfo${
                    nestedKey.charAt(0).toUpperCase() + nestedKey.slice(1)
                  }`
                : nestedKey;
            const fieldLabel = this.fieldLabels[fullKey] || fullKey;
            this.missingRequiredFields.push(fieldLabel);
          }
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach((group, index) => {
          if (group instanceof FormGroup) {
            Object.keys(group.controls).forEach((field) => {
              const fieldControl = group.get(field);
              if (fieldControl?.invalid && fieldControl?.hasError('required')) {
                const readableField = this.fieldLabels[field] || field;
                const readableGroup = this.fieldLabels[key] || key;
                this.missingRequiredFields.push(
                  `${readableGroup} [${index}]: ${readableField}`
                );
              }
            });
          }
        });
      } else {
        if (control?.invalid && control?.hasError('required')) {
          this.missingRequiredFields.push(`${this.fieldLabels[key] || key}`);
        }
      }
    });
    const missingFieldsHtml = this.missingRequiredFields.length
      ? `<p>الحقول المطلوبة:</p><ul>${this.missingRequiredFields
          .map((field) => `<li>${field}</li>`)
          .join('')}</ul>`
      : 'جميع الحقول ممتلئة';
    this.deleteSwal.fire();
    setTimeout(() => {
      this.deleteSwal.update({ html: missingFieldsHtml });
    }, 100);
  }
}
