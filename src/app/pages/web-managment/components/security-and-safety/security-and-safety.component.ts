import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-security-and-safety',
  templateUrl: './security-and-safety.component.html',
  styleUrl: './security-and-safety.component.scss',
})
export class SecurityAndSafetyComponent {
  formGroup!: FormGroup;

  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  @ViewChild('successSwal') successSwal: SwalComponent;
  // setPlaceholder() {
  //   setTimeout(() => {
  //     const editor = document.querySelector('.ql-editor');
  //     if (editor) {
  //       editor.setAttribute('data-placeholder', 'كلمة الترحيب');
  //     }
  //   }, 100);
  // }
  id: string;
  editMode: boolean;
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  };

  triggerDelete() {
    this.successSwal.fire();
  }

  openDeleteSwal() {
    this.deleteSwal.fire();
  }
  constructor(private route: ActivatedRoute) {
    route.params.subscribe({
      next: ({ id }) => {
        this.id = id;
      },
    });
    if (this.id) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      selectedType: new FormControl(),
      text: new FormControl(),
    });
  }

  isFileSelected1: boolean = false;

  onFileSelected1(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isFileSelected1 = !!input?.files?.length;
  }
}
