import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FAQService } from 'src/app/_metronic/layout/core/services/web-managment/faq.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  private readonly _FAQService = inject(FAQService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
  };
  FaqFormGroup!: FormGroup;
  allFAQ: any[] = [];
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  arabicRegex = /^[\u0600-\u06FF0-9\s\p{P}]+$/u;
  englishRegex = /^[A-Za-z0-9\s\p{P}]+$/u;
  ngOnInit() {
    this.initialFaqFormGroup();
    this.getAllFAQ();
  }
  initialFaqFormGroup(): void {
    this.FaqFormGroup = this._FormBuilder.group({
      titleAr: [
        '',
        [Validators.required, Validators.pattern(this.arabicRegex)],
      ],
      titleEn: [
        'default',
        [Validators.required, Validators.pattern(this.englishRegex)],
      ],
      descriptionAr: ['', [Validators.required]],
      descriptionEn: ['default', [Validators.required]],
    });
  }
  get titleAr() {
    return this.FaqFormGroup.get('titleAr');
  }
  get titleEn() {
    return this.FaqFormGroup.get('titleEn');
  }

  blockEnglishLetters(event: KeyboardEvent): void {
    const arabicRegex = this.arabicRegex;
    const key = event.key;

    if (!arabicRegex.test(key) && key !== 'Backspace' && key !== 'Delete') {
      event.preventDefault();
      this.titleAr?.setErrors({ englishNotAllowed: true });
      this.titleAr?.markAsTouched();
    }
  }
  blockArabicLetters(event: KeyboardEvent): void {
    const englishRegex = this.englishRegex;
    const key = event.key;

    if (!englishRegex.test(key) && key !== 'Backspace' && key !== 'Delete') {
      event.preventDefault();
      this.titleEn?.setErrors({ arabicNotAllowed: true });
      this.titleEn?.markAsTouched();
    }
  }
  getAllFAQ(): void {
    this._FAQService.getAllFAQ().subscribe({
      next: (response) => {
        this.allFAQ = response.body.data;
        console.log(response);
        this.cdr.detectChanges();
      },
    });
  }
  deleteFAQ(id: any): void {
    this._FAQService.deleteFAQ(id).subscribe({
      next: () => {
        this.getAllFAQ();
      },
      error: () => {
        Swal.fire({
          title: 'حدث خطأ أثناء الحذف!',
          icon: 'error',
          confirmButtonText: 'حسناً',
        });
      },
    });
  }

  isEditMode = false;
  editingId: number | null = null;

  editData(item: any) {
    console.log('Editing item:', item);
    this.FaqFormGroup.patchValue({
      titleAr: item.title,
      titleEn: item.title,
      descriptionAr: item.description,
      descriptionEn: item.description,
    });
    const editorElement = document.querySelector('.ql-editor');
    if (editorElement) {
      editorElement.innerHTML = item.description || '';
    }
    this.isEditMode = true;
    this.editingId = item.id;
    console.log(this.FaqFormGroup.value);
  }

  submitForm() {
    if (this.isEditMode && this.editingId) {
      const updatedData = { id: this.editingId, ...this.FaqFormGroup.value };
      this._FAQService.updateFAQ(updatedData).subscribe({
        next: () => {
          this.successSwal.fire().then(() => {
            this.getAllFAQ();
            this.FaqFormGroup.reset();
            this.FaqFormGroup.patchValue({
              titleEn: 'default',
              descriptionEn: 'default',
            });
            this.isEditMode = false;
            this.editingId = null;
          });
        },
        error: () => {
          Swal.fire({
            title: 'حدث خطأ أثناء التعديل!',
            icon: 'error',
            confirmButtonText: 'حسناً',
          });
        },
      });
    } else {
      this._FAQService.createFAQ(this.FaqFormGroup.value).subscribe({
        next: (res) => {
          this.successSwal.fire().then(() => {
            this.getAllFAQ();
            this.FaqFormGroup.reset();
          });
          console.log(res);
        },
        error: () => {
          Swal.fire({
            title: 'حدث خطأ أثناء الإضافة!',
            icon: 'error',
            confirmButtonText: 'حسناً',
          });
        },
      });
    }
  }
}
