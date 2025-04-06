import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-cards-widget20',
  templateUrl: './cards-widget20.component.html',
  styleUrls: ['./cards-widget20.component.scss'],
})
export class CardsWidget20Component {
  @Input() data: any[] = [];
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<number>();
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  @ViewChild('successSwal') successSwal: SwalComponent;
  private cdr = inject(ChangeDetectorRef);
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  };

  ngOnChanges(): void {
    if (this.data?.length) {
      this.data = this.data.map((item) => ({
        ...item,
        description: item?.description
          ? this.stripHtmlTags(item.description)
          : '',
      }));
      this.cdr.detectChanges();
    }
  }

  stripHtmlTags(html: string): string {
    if (!html) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    this.cdr.detectChanges();
    return doc.body.textContent || '';
  }

  triggerDelete() {
    this.successSwal.fire();
  }

  openDeleteSwal(id: any) {
    this.deleteSwal.fire().then((result) => {
      if (result.isConfirmed) {
        this.deleteEvent.emit(id); // إرسال ID للمكون الأب
      }
    });
  }
  editData(item: any) {
    this.editEvent.emit(item);
  }
}
