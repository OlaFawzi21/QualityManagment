import {
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-add-edit-job',
  templateUrl: './add-edit-job.component.html',
  styleUrl: './add-edit-job.component.scss',
})
export class AddEditJobComponent {
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  formGroup!: FormGroup;

  id: string;
  editMode: boolean;

  jobTitle: any = {};
  governments: any = [];

  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
  };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageService
  ) {
    this.route.params.subscribe({
      next: ({ id }) => {
        this.id = id;
      },
    });
    if (this.id) {
      this.editMode = true;
      this.getJobTitle();
    } else {
      this.editMode = false;
    }

    this.formGroup = this.fb.group({
      id: [{ value: null, disabled: true }],
      jobTitle: ['', [Validators.required]],
      jobTitleEn: ['', [Validators.required]],
      jobNumber: ['', [Validators.required]],
      jobRank: ['', [Validators.required]],
      mainCategory: ['', [Validators.required]],
      department: ['', [Validators.required]],
      section: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      responsibleManager: ['', [Validators.required]],
      responsibleManagerEn: ['', [Validators.required]],
      category: ['', [Validators.required]],
      categoryEn: ['', [Validators.required]],
      reviewDate: ['', [Validators.required]],
      reportsTo: ['', [Validators.required]],
      reportsToEn: ['', [Validators.required]],
      mainResponsibility: ['', [Validators.required]],
      responsibilities: ['', [Validators.required]],
      monthlyProgramIncludes: ['', [Validators.required]],
      requiredQualifications: ['', [Validators.required]],
      languages: ['', [Validators.required]],
      practicalExperience: ['', [Validators.required]],
      cultureAndPersonalBenefits: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  getJobTitle() {
    // this.service.fun(this.id).subscribe({
    //   next: (res: any) => {
    //     this.jobTitle = res.data;
    //     console.log('API Response:', this.jobTitle);
    //   },
    // });
  }

  submitPlace() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.logInvalidFields();
      console.log(this.formGroup);
      return;
    }

    if (this.editMode) {
      this.formGroup.get('id')?.enable();
      // this.this.service.fun(this.formGroup.value).subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     if (res.isSuccess) {
      //       this.router.navigate(['/jobTitles']);
      //     }
      //   },
      // });
    } else {
      // this.this.service.fun(this.formGroup.value).subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     if (res.isSuccess) {
      //       this.router.navigate(['/jobTitles']);
      //     }
      //   },
      // });
    }
  }

  fieldLabels: { [key: string]: string } = {
    jobTitle: 'المسمى الوظيفي',
    jobTitleEn: 'المسمى الوظيفي (EN)',
    jobNumber: 'رقم الوظيفة',
    jobRank: 'رتبة الوظيفة',
    mainCategory: 'الفئة الرئيسية',
    department: 'الاداره',
    section: 'القسم',
    unit: 'الوحده',
    responsibleManager: 'المدير المسؤول',
    responsibleManagerEn: 'المدير المسؤول (EN)',
    category: 'الفئة',
    categoryEn: 'الفئة (EN)',
    reviewDate: 'تاريخ المراجعه',
    reportsTo: 'المسؤولون تجاهه',
    reportsToEn: 'المسؤولون تجاهه (EN)',
    mainResponsibility: 'المسؤولية الرئيسية',
    responsibilities: 'المسؤوليات',
    monthlyProgramIncludes: 'يتضمن برنامج عمله الشهرى اشياء اخرى',
    requiredQualifications: 'المؤهلات المطلوبه',
    languages: 'اللغات',
    practicalExperience: 'خبره عمليه',
    cultureAndPersonalBenefits: 'الثقافه والمزايا الشخصيه',
  };

  missingRequiredFields: string[] = [];

  logInvalidFields() {
    this.missingRequiredFields = [];
    Object.keys(this.formGroup.controls).forEach((key) => {
      const control = this.formGroup.get(key);
      if (control?.invalid && control?.hasError('required')) {
        this.missingRequiredFields.push(`${this.fieldLabels[key] || key}`);
      }
    });
    const missingFieldsHtml = this.missingRequiredFields.length
      ? `<p>الحقول المطلوبة:</p><ul>${this.missingRequiredFields
          .map((field) => `<li>${field}</li>`)
          .join('')}</ul>`
      : 'جميع الحقول ممتلئة';
    this.deleteSwal.fire();
    setTimeout(() => {
      this.deleteSwal.update({ html: missingFieldsHtml });
    }, 100);
  }
}
