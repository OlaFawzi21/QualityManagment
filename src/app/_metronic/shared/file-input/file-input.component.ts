import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
})
export class FileInputComponent {
  @Input() label: string;
  @Input() acceptMultiple: boolean;
  @Input() accept: string;

  @Input() imgPath: string = '../../../../assets/images/img/picture.svg';
  @Output() fileSelected = new EventEmitter<any>();

  fileSelectedState: boolean = false;

  handleFileChange(event: Event): void {
    const input = event;
    this.fileSelectedState = false;
    if (input) {
      this.fileSelected.emit(input);
    }
  }
}
