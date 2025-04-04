import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-security-report',
  templateUrl: './security-report.component.html',
  styleUrl: './security-report.component.scss'
})
export class SecurityReportComponent {
  formGroup!: FormGroup;
  isLoading = false;
  cities: any[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

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
  }
  onSubmit() {}
}
