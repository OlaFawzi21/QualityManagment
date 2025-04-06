import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-heritage-technical-report',
  templateUrl: './heritage-technical-report.component.html',
  styleUrl: './heritage-technical-report.component.scss',
})
export class HeritageTechnicalReportComponent {
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
