import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/_metronic/layout/core/services/dashboard/dashboard.service';
import { GeneratePdfService } from 'src/app/_metronic/layout/core/services/reports/generate-pdf.service';
import { VisitorsService } from 'src/app/_metronic/layout/core/services/reports/visitors.service';
import * as moment from 'moment-hijri';

@Component({
  selector: 'app-interactive-report',
  templateUrl: './interactive-report.component.html',
  styleUrl: './interactive-report.component.scss',
})
export class InteractiveReportComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _VisitorsService = inject(VisitorsService);
  private readonly _DashboardService = inject(DashboardService);
  private readonly _GeneratePdfService = inject(GeneratePdfService);
  private readonly fb = inject(FormBuilder);
  username: string;
  HeritageSitesWithReviews: any[] = [];

  // Form data parameters
  NationalityId!: number | null;
  Classification!: string | null;
  StartDate!: string | null;
  EndDate!: string | null;
  formGroup!: FormGroup;
  isLoading = false;
  nations: any[] = [];
  placesType: any[] = [
    { name: 'تاريخي', id: 0 },
    { name: 'أثري', id: 1 },
    { name: 'ثقافي', id: 2 },
    { name: 'طبيعي', id: 3 },
    { name: 'ديني', id: 4 },
  ];

  today: any;
  startDate: any = 'YYYY-MM-DD';
  endDate: any = 'YYYY-MM-DD';

  constructor() {
    this.username = localStorage.getItem('username') || '';
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      NationalityId: [null],
      Classification: [null],
      StartDate: [null],
      EndDate: [null],
    });
    this.getHeritageSitesWithReviews();
    this.getNation();
    this.today = this.convertToHijri(new Date());
  }

  convertToHijri(date: Date): string {
    return moment(date).locale('ar-SA').format('iD iMMMM iYYYY');
  }

  getNation() {
    this._DashboardService.getNation().subscribe({
      next: (res) => {
        this.nations = res.data;
      },
    });
  }

  getHeritageSitesWithReviews(params: any = {}) {
    const defaultParams = {
      NationalityId: params.NationalityId || null,
      Classification: params.Classification || null,
      StartDate: params.StartDate || null,
      EndDate: params.EndDate || null,
    };

    this._VisitorsService.getHeritageSitesWithReviews(defaultParams).subscribe(
      (response) => {
        this.HeritageSitesWithReviews = response.body.data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching visitor statistics', error);
      }
    );
  }

  lastSubmittedParams = {};
  onSubmit() {
    if (this.formGroup?.valid) {
      const getLocalDate = (dateValue: any) => {
        if (!dateValue) return null;
        const date = new Date(dateValue);
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      };

      const params: any = {
        NationalityId: this.formGroup?.get('NationalityId')?.value || null,
        Classification: this.formGroup?.get('Classification')?.value || null,
        StartDate: getLocalDate(this.formGroup?.get('StartDate')?.value),
        EndDate: getLocalDate(this.formGroup?.get('EndDate')?.value),
      };

      Object.keys(params).forEach((key) => {
        if (params[key] === null || params[key] === '') {
          delete params[key];
        }
      });
      this.lastSubmittedParams = params;
      this.getHeritageSitesWithReviews(params);

      this.startDate = params.StartDate;
      this.endDate = params.EndDate;
    }
  }
}
