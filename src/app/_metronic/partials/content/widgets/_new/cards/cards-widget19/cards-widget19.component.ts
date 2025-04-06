import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cards-widget19',
  templateUrl: './cards-widget19.component.html',
  styleUrl: './cards-widget19.component.scss',
})
export class CardsWidget19Component {
  @Input() attractionPlaces: any[] = [];
  @Output() attractionPlaceId = new EventEmitter();
  assets = environment.assets;
  openDeleteSwal(id: string) {
    this.attractionPlaceId.emit(id);
  }

  convertTimeStringToDate(timeString: string): string {
    if (!timeString) return '';
    let [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }
}
