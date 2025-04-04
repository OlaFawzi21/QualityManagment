import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { DashboardService } from 'src/app/_metronic/layout/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-cards-widget7',
  templateUrl: './cards-widget7.component.html',
  styleUrls: ['./cards-widget7.component.scss'],
})
export class CardsWidget7Component implements OnInit {
  @Input() cssClass: string = '';
  private readonly _DashboardService = inject(DashboardService);
  private readonly cdr = inject(ChangeDetectorRef);
  users: any[] = [];
  ngOnInit(): void {
    this.getMostVisitedNationalities();
  }

  getMostVisitedNationalities() {
    this._DashboardService.getMostVisitedNationalities().subscribe({
      next: (response) => {
        this.users = response.data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching most nationality data:', err);
      },
    });
  }
}
