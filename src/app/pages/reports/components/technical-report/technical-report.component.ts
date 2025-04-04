import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-technical-report',
  templateUrl: './technical-report.component.html',
  styleUrl: './technical-report.component.scss',
})
export class TechnicalReportComponent {
  formGroup!: FormGroup;
  isLoading = false;
  cities: any[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  username: string;
  selectedCity!: any;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      selectedReport: [''],
      selectedTrans: [''],
      selectedNation: [''],
      selectedHeritage: [''],
      selectedPlace: [''],
      formDate: [''],
    });
    this.username = localStorage.getItem('username') || '';
  }
  onSubmit() {}
}
