import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss',
})
export class QrCodeComponent {
  username: string;

  constructor() {
    this.username = localStorage.getItem('username') || '';
  }
}
