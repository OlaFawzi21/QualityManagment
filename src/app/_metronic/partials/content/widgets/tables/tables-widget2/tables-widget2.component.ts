import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tables-widget2',
  templateUrl: './tables-widget2.component.html',
  styleUrls: ['./tables-widget2.component.scss'],
})
export class TablesWidget2Component {
  @Input() allPlaces: any = [];
  @Output() placeID = new EventEmitter();
  assets = environment.assets;
  openDeleteSwal(id: string) {
    this.placeID.emit(id);
  }
}
