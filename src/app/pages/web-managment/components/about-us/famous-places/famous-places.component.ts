import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-famous-places',
  templateUrl: './famous-places.component.html',
  styleUrl: './famous-places.component.scss',
})
export class FamousPlacesComponent {
  formGroup!: FormGroup;
  siteTypes: any[] = [
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
  ngOnInit() {
    this.formGroup = new FormGroup({
      selectedType: new FormControl(),
      text: new FormControl(),
    });
  }
}
