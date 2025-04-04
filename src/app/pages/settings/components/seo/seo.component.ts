import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SeoService } from 'src/app/_metronic/layout/core/services/seo/seo.service';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrl: './seo.component.scss',
})
export class SeoComponent {
  private readonly _SeoService = inject(SeoService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  @ViewChild('successSwal2') successSwal2: SwalComponent;
  seoForm: FormGroup;
  isLoading = false;
  keyword: FormControl = new FormControl('');

  ngOnInit() {
    this.initForm();
    this.getSeoInformation();
  }
  initForm() {
    this.seoForm = this._FormBuilder.group({
      keywordsAr: [[''], [Validators.required]],
      keywordsEn: [['default']],
      metaTitleAr: ['', [Validators.required]],
      metaTitleEn: ['default'],
      metaDescriptionAr: ['', [Validators.required]],
      metaDescriptionEn: ['default'],
    });
  }
  getSeoInformation() {
    this._SeoService.getSeoInformation().subscribe({
      next: (response) => {
        this.seoForm.patchValue({
          keywordsAr: response.data.keywordsAr || [],
          keywordsEn: response.data.keywordsEn || ['default'],
          metaTitleAr: response.data.metaTitleAr || '',
          metaTitleEn: response.data.metaTitleEn || 'default',
          metaDescriptionAr: response.data.metaDescriptionAr || '',
          metaDescriptionEn: response.data.metaDescriptionEn || 'default',
        });
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching SEO information', error);
      },
    });
  }

  onPress(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const trimmedKeyword = (this.keyword.value || '').trim();
      if (!trimmedKeyword) {
        return;
      }
      let keywords: string[] = this.seoForm.get('keywordsAr')?.value || [];
      if (!keywords.includes(trimmedKeyword)) {
        keywords = [...keywords, trimmedKeyword];
        this.seoForm.patchValue({ keywordsAr: keywords });
      }
      console.log(keywords);
      this.keyword.reset();
    }
  }

  removeKeyword(index: number) {
    let keywords: string[] = this.seoForm.get('keywordsAr')?.value || [];
    keywords.splice(index, 1);
    this.seoForm.patchValue({ keywordsAr: keywords });
  }

  submitForm() {
    if (this.seoForm.invalid) {
      this.seoForm.markAllAsTouched();
      return;
    } else {
      this.isLoading = true;
      this._SeoService.updateSeoInformation(this.seoForm.value).subscribe(
        (response) => {
          this.isLoading = false;
          this.successSwal2.fire().then(() => {
            this.getSeoInformation();
          });
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error updating SEO information', error);
          this.isLoading = false;
        }
      );
    }
  }
}
