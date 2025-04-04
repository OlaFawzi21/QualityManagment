import { Component } from '@angular/core';

@Component({
  selector: 'app-app-performance',
  templateUrl: './app-performance.component.html',
  styleUrl: './app-performance.component.scss',
})
export class AppPerformanceComponent {
  username: string;
  constructor() {
    this.username = localStorage.getItem('username') || '';
  }
}
