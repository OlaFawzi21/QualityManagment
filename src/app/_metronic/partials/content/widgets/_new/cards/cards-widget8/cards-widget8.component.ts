import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cards-widget8',
  templateUrl: './cards-widget8.component.html',
  styleUrl: './cards-widget8.component.scss',
})
export class CardsWidget8Component {
  @Input() allPlaces: any = [];
  @Output() placeID = new EventEmitter();
  assets = environment.assets;
  openDeleteSwal(id: string) {
    this.placeID.emit(id);
  }
}
