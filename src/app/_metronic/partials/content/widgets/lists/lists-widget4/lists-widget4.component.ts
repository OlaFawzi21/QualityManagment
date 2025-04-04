import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { EventService } from 'src/app/_metronic/layout/core/services/web-managment/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lists-widget4',
  templateUrl: './lists-widget4.component.html',
})
export class ListsWidget4Component {
  private readonly _EventService = inject(EventService);
  private readonly cdr = inject(ChangeDetectorRef);
  attractionPlaces: any[] = [];
  assets = environment.assets;
  ngOnInit() {
    this.getAllAttractionPlaces();
  }
  getAllAttractionPlaces() {
    this._EventService.getLastFiveEvent().subscribe({
      next: (res: any) => {
        this.attractionPlaces = res.data;
        this.cdr.detectChanges();
      },
    });
  }
}
