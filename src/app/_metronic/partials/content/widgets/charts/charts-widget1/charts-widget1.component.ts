import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { getCSSVariableValue } from '../../../../../kt/_utils';
import { DashboardService } from 'src/app/_metronic/layout/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-charts-widget1',
  templateUrl: './charts-widget1.component.html',
  styleUrl: './charts-widget1.component.scss',
})
export class ChartsWidget1Component implements OnInit {
  selectedData: any;
  selectedPathId: number;
  places: any = [];

  constructor(
    private dashboardService: DashboardService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getMostVisited(9);
    this.selectedPathId = 9;
  }

  getMostVisited(id: number) {
    this.dashboardService.getMostHeritagePlaces(id).subscribe({
      next: (res) => {
        this.places = res.data;
        console.log(this.places);
        this.cdRef.detectChanges();
      },
    });
  }

  handlePathClick(pathId: number) {
    console.log(pathId);
    switch (pathId) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        this.getMostVisited(pathId);
        this.selectedPathId = pathId;
        break;
      default:
        console.warn('Path not found:', pathId);
        return;
    }
  }
}
