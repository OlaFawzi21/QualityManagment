import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent {
  currentRoute: string = '';
  userRole: any;
  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      cdr.detectChanges();
    });
    this.userRole = localStorage.getItem('userRole') || '';
  }

  // getIcon(route: string, activeIcon: string, inactiveIcon: string): string {
  //   return this.currentRoute === route ? activeIcon : inactiveIcon;
  // }
  getIcon(routePart: string, activeIcon: string, inactiveIcon: string): string {
    return this.currentRoute.includes(routePart) ? activeIcon : inactiveIcon;
  }
}
