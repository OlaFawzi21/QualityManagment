import { Component } from '@angular/core';

@Component({
  selector: 'app-public-safety',
  templateUrl: './public-safety.component.html',
  styleUrl: './public-safety.component.scss',
})
export class PublicSafetyComponent {
  username: string;

  constructor() {
    this.username = localStorage.getItem('username') || '';
  }
}
