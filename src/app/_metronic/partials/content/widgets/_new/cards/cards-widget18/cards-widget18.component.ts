import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cards-widget18',
  templateUrl: './cards-widget18.component.html',
  styleUrls: ['./cards-widget18.component.scss'],
})
export class CardsWidget18Component {
  @Input() events: any[] = [];
  @Output() eventId = new EventEmitter();

  assets = environment.assets;

  openDeleteSwal(id: string) {
    this.eventId.emit(id);
  }

  convertTimeStringToDate(timeString: string): string {
    if (!timeString) return '';
    let [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }
}
