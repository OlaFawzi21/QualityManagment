import { Component } from '@angular/core';

@Component({
  selector: 'app-visitor-tracking',
  templateUrl: './visitor-tracking.component.html',
  styleUrl: './visitor-tracking.component.scss',
})
export class VisitorTrackingComponent {
  username: string;

  constructor() {
    this.username = localStorage.getItem('username') || '';
  }
}
