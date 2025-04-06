import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DashboardService } from 'src/app/_metronic/layout/core/services/dashboard/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operational-report',
  templateUrl: './operational-report.component.html',
  styleUrl: './operational-report.component.scss',
})
export class OperationalReportComponent {
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

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      NationalityId: [null], // NationalityId
      Classification: [''], // Classification
      StartDate: [null], // StartDate
      EndDate: [null], // EndDate
    });
  }

  // ngOnInit(): void {
  //   this.getNation();
  // }

  // getNation() {
  //   this.dashboardService.getNation().subscribe({
  //     next: (res) => {
  //       this.nations = res.data;
  //     },
  //   });
  // }

  // onSubmit() {
  //   if (this.formGroup.valid) {
  //     const queryParams: any = {
  //       NationalityId: this.formGroup.value.NationalityId,
  //       Classification: this.formGroup.value.selectedHeritage,

  //       StartDate: this.formGroup
  //         .get('StartDate')
  //         ?.setValue(
  //           new Date(this.formGroup.get('StartDate')?.value)
  //             .toISOString()
  //             .split('.')[0]
  //         ),
  //       EndDate: this.formGroup
  //         .get('EndDate')
  //         ?.setValue(
  //           new Date(this.formGroup.get('EndDate')?.value)
  //             .toISOString()
  //             .split('.')[0]
  //         ),
  //     };

  //     // Remove null or empty values
  //     Object.keys(queryParams).forEach((key) => {
  //       if (queryParams[key] === null || queryParams[key] === '') {
  //         delete queryParams[key];
  //       }
  //     });
  //     this.reportDataService.setReportData(queryParams);
  //     // this.router.navigate(['/visitor-statistics']);
  //   }
  // }
}
