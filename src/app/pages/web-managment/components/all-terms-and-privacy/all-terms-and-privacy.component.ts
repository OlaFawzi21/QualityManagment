import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { TermsAndPrivacyService } from 'src/app/_metronic/layout/core/services/web-managment/terms-and-privacy.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-all-terms-and-privacy',
  templateUrl: './all-terms-and-privacy.component.html',
  styleUrl: './all-terms-and-privacy.component.scss',
})
export class AllTermsAndPrivacyComponent {
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  private readonly _TermsAndPrivacyService = inject(TermsAndPrivacyService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
  };
  termsFormGroup!: FormGroup;
  allTermsAndPrivacy: any[] = [];
  // arabicRegex = /^[\u0600-\u06FF0-9\s\p{P}]+$/u;
  // englishRegex = /^[A-Za-z0-9\s\p{P}]+$/u;
  ngOnInit() {
    this.initialTermsFormGroup();
    this.getAllTermsAndPrivacy();
  }
  initialTermsFormGroup(): void {
    this.termsFormGroup = this._FormBuilder.group({
      titleAr: ['', [Validators.required]],
      titleEn: ['default', [Validators.required]],
      descriptionAr: ['', [Validators.required]],
      descriptionEn: ['default', [Validators.required]],
      termType: [null, [Validators.required]],
    });
  }
  get titleAr() {
    return this.termsFormGroup.get('titleAr');
  }
  get titleEn() {
    return this.termsFormGroup.get('titleEn');
  }
  setTermType(type: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.termsFormGroup.patchValue({ termType: type === 'using' ? 1 : 2 });
    } else {
      this.termsFormGroup.patchValue({ termType: null });
    }
  }

  getAllTermsAndPrivacy(): void {
    this._TermsAndPrivacyService.getAllTermsAndPrivacy().subscribe({
      next: (response) => {
        this.allTermsAndPrivacy = response.body.data.termAndConditions;
        console.log(this.allTermsAndPrivacy);
        this.cdr.detectChanges();
      },
    });
  }
  deleteTermAndPrivcy(id: any): void {
    this._TermsAndPrivacyService.deleteTermsAndPrivacy(id).subscribe({
      next: () => {
        this.getAllTermsAndPrivacy();
      },
      error: (err) => {
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
    this.termsFormGroup.patchValue({
      titleAr: item.title,
      titleEn: item.title,
      descriptionAr: item.description,
      descriptionEn: item.description,
      termType: item.termType,
    });
    const editorElement = document.querySelector('.ql-editor');
    if (editorElement) {
      editorElement.innerHTML = item.description || '';
    }
    this.isEditMode = true;
    this.editingId = item.id;
    console.log(this.termsFormGroup.value);
  }

  submitForm() {
    if (this.isEditMode && this.editingId) {
      const updatedData = { id: this.editingId, ...this.termsFormGroup.value };
      this._TermsAndPrivacyService
        .updateTermsAndPrivacy(updatedData)
        .subscribe({
          next: () => {
            this.successSwal.fire().then(() => {
              this.getAllTermsAndPrivacy();
              this.termsFormGroup.reset();
              this.termsFormGroup.patchValue({
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
      this._TermsAndPrivacyService
        .createTermsAndPrivacy(this.termsFormGroup.value)
        .subscribe({
          next: (res) => {
            this.successSwal.fire().then(() => {
              this.getAllTermsAndPrivacy();
              this.termsFormGroup.reset();
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
