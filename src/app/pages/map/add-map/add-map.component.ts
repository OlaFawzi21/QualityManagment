import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MapsService } from 'src/app/_metronic/layout/core/services/maps/maps.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

interface Place {
  name: string;
  description: string;
  type: string;
  lat: number;
  lng: number;
  icon: string;
}

interface SiteType {
  label: string;
  value: number;
  icon: string;
}

@Component({
  selector: 'app-add-map',
  templateUrl: './add-map.component.html',
  styleUrl: './add-map.component.scss',
})
export class AddMapComponent {
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('successSwal2') successSwal2: SwalComponent;
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _MapsService = inject(MapsService);
  private readonly _Router = inject(Router);
  placeMapForm: FormGroup;
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
  };
  editingId: number | null = null;
  private L: any; // Leaflet instance
  private map: any; // Map instance

  public Place: Place = {
    name: '',
    description: '',
    type: '',
    lat: 0,
    lng: 0,
    icon: '',
  };
  public place: Place = {
    name: '',
    description: '',
    type: '',
    lat: 0,
    lng: 0,
    icon: '',
  };

  textLink: string = '';
  manualLat: number = 0;
  manualLng: number = 0;
  locationType: string = 'direct';

  showGPSPrompt = false;
  latitude: number | null = null;
  longitude: number | null = null;
  locationName: string | null = null;

  siteTypes: SiteType[] = [
    {
      label: 'تاريخي',
      value: 0,
      icon: 'assets/images/img/gabal.svg',
    },
    {
      label: 'أثري',
      value: 1,
      icon: 'assets/images/img/gabal.svg',
    },
    {
      label: 'ثقافي',
      value: 2,
      icon: 'assets/images/img/museum.svg',
    },
    {
      label: 'طبيعي',
      value: 3,
      icon: 'assets/images/img/erth.svg',
    },
    {
      label: 'ديني',
      value: 4,
      icon: 'assets/images/img/mosque.svg',
    },
  ];

  id: string;
  editMode: boolean;

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe({
      next: ({ id }) => {
        this.id = id;
      },
    });
    if (this.id) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }
    this.placeMapForm = this._FormBuilder.group({
      name: ['', Validators.required],
      classification: [null, Validators.required],
      description: ['', Validators.required],
      coordinates: this._FormBuilder.group({
        latitude: [null, Validators.required],
        longitude: [null, Validators.required],
      }),
      totalArea: [null],
    });
  }

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.requestLocation();
      try {
        this.L = await import('leaflet');
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      if (!this.L) this.L = await import('leaflet');
      setTimeout(() => this.initMap(), 500);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private initMap(): void {
    if (!this.mapContainer?.nativeElement || !this.L) return;

    if (this.map) this.map.remove();

    // Define strict boundaries around the Hail Region
    const hailRegionBounds = this.L.latLngBounds(
      this.L.latLng(27.2, 41.5), // Southwest corner of Hail Region
      this.L.latLng(28.2, 42.8) // Northeast corner of Hail Region
    );

    // Initialize the map with restrictions
    this.map = this.L.map(this.mapContainer.nativeElement, {
      center: [27.5219, 41.6907], // Hail City Center
      zoom: 10, // Adjust to best fit Hail region
      minZoom: 10, // Prevent zooming out too much
      maxZoom: 15, // Allow some zooming in
      maxBounds: hailRegionBounds, // Restrict movement outside Hail
      maxBoundsViscosity: 1.0, // Strictly enforce bounds
    });

    // Add Google Maps tile layer
    this.L.tileLayer('http://www.google.cn/maps/vt?lyrs=m&x={x}&y={y}&z={z}', {
      attribution: '© Google Maps',
      opacity: 1.0,
    }).addTo(this.map);

    // Handle map clicks (Only inside Hail)
    this.map.on('click', async (event: any) => {
      if (!hailRegionBounds.contains(event.latlng)) {
        console.warn('Click outside Hail region ignored.');
        return; // Ignore clicks outside Hail
      }

      this.place.lat = event.latlng.lat;
      this.place.lng = event.latlng.lng;
      const placeName = await this.getPlaceName(this.place.lat, this.place.lng);
      this.placeMapForm.patchValue({
        coordinates: {
          latitude: this.place.lat,
          longitude: this.place.lng,
        },
      });
      this.successSwal.fire();
      this.updatePlaceDetails(placeName);
      this.showPopup(this.place.lat, this.place.lng, placeName);
    });
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

  private updatePlaceDetails(placeName: string = ''): void {
    this.Place = {
      name: this.place.name || placeName,
      description: this.place.description,
      type: this.place.type,
      lat: this.place.lat,
      lng: this.place.lng,
      icon: this.place.icon,
    };
    console.log('Updated Place:', this.Place);
  }

  extractPlaceDetails(url: string): void {
    const placeNameMatch = url.match(/place\/([^\/]+)\//);
    const latLngMatch = url.match(/!8m2!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);

    if (placeNameMatch && latLngMatch) {
      this.Place = {
        name: this.place.name, //decodeURIComponent(placeNameMatch[1]).replace(/\+/g, ' '),
        description: this.place.description,
        type: this.place.type,
        lat: parseFloat(latLngMatch[1]),
        lng: parseFloat(latLngMatch[2]),
        icon: this.place.icon,
      };

      console.log('Extracted Place Details:', this.Place);
    } else {
      console.error('Failed to extract details from the URL.');
    }
  }

  // addPlace(): void {
  //   if (this.locationType === 'direct') {
  //     if (this.isValidPlace(this.place)) {
  //       this.updatePlaceDetails();
  //     } else {
  //       console.warn('All required fields must be filled.');
  //     }
  //   } else if (this.locationType === 'manual') {
  //     this.Place = {
  //       name: this.place.name,
  //       description: this.place.description,
  //       type: this.place.type,
  //       lat: this.manualLat,
  //       lng: this.manualLng,
  //       icon: this.place.icon,
  //     };

  //     if (this.isValidPlace(this.Place)) {
  //       console.log('Manually Added Place:', this.Place);
  //     } else {
  //       console.warn('All required fields must be filled.');
  //     }
  //   } else {
  //     this.extractPlaceDetails(this.textLink);
  //   }
  // }

  private isValidPlace(place: Place): boolean {
    return !!(
      place.name &&
      place.description &&
      place.type &&
      place.lat &&
      place.lng &&
      place.icon
    );
  }

  getIcon(type: SiteType): void {
    this.place.icon = type.icon;
  }

  requestLocation(): void {
    if (navigator.geolocation) {
      // Requesting location, the browser will ask for permission
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // If the user allows location access
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.showGPSPrompt = false;

          // Log the latitude, longitude, and location name
          console.log('Latitude:', this.latitude);
          console.log('Longitude:', this.longitude);

          // Fetch location name using reverse geocoding
          this.getLocationName(this.latitude, this.longitude);
        },
        (error) => {
          // If the user denies location access, handle it
          this.showGPSPrompt = true;
        }
      );
    } else {
    }
  }

  async getLocationName(lat: number, lng: number): Promise<void> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=ar`
      );
      const data = await response.json();

      if (data && data.display_name) {
        this.locationName = data.display_name;
        console.log('Location Name (Arabic):', this.locationName);
      } else {
        this.locationName = 'الموقع غير موجود';
        console.log('Location Name: الموقع غير موجود');
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
      this.locationName = 'لم نتمكن من استرجاع اسم الموقع';
      console.log('Location Name: لم نتمكن من استرجاع اسم الموقع');
    }
  }

  submitForm() {
    if (this.editMode && this.editingId) {
      const updatedData = { id: this.editingId, ...this.placeMapForm.value };
      this._MapsService.createMapsAndPlaces(updatedData).subscribe({
        next: () => {
          this.successSwal2.fire().then(() => {
            this.placeMapForm.reset();
            this.editMode = false;
            this.editingId = null;
          });
        },
        error: () => {
          Swal.fire({
            title: 'حدث خطأ أثناء التعديل!',
            icon: 'error',
            confirmButtonText: 'حسناً',
          });
        },
      });
    } else {
      if (this.placeMapForm.invalid) {
        this.deleteSwal.fire().then(() => {
          this.placeMapForm.markAllAsTouched();
        });
      } else {
        this._MapsService
          .createMapsAndPlaces(this.placeMapForm.value)
          .subscribe({
            next: (res) => {
              this.successSwal2.fire().then(() => {
                this.placeMapForm.reset();
                this._Router.navigate(['/location']);
              });
              // console.log(res);
              // console.log('Submitted Place:', this.placeMapForm.value);
            },
            error: () => {
              this.deleteSwal.fire();
            },
          });
      }
    }
  }
}
