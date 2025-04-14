import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-add-procedure',
  templateUrl: './add-procedure.component.html',
  styleUrl: './add-procedure.component.scss',
})
export class AddProcedureComponent {
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
      procedureName: [''], // اسم الاجراء
      procedureNameEn: [''], // اسم الاجراء (EN)
      procedureNumber: [''], // رقم الاجراء
      department: [''], // الاداره
      section: [''], // القسم
      division: [''], // الشعبة
      issueDate: [''], // تاريخ الاصدار
      frequency: [''], // التكرار
      executionPlace: [''], // مكان تنفيذ الاجراء
      executionPlaceEn: [''], // مكان تنفيذ الاجراء (EN)
      beneficiaries: [''], // المستفيدين
      beneficiariesEn: [''], // المستفيدين (EN)

      serviceProviders: [''], // مزودي الخدمة
      lastUpdate: [''], // اخر تحديث على الاجراء
      activationDate: [''], // تاريخ التفعيل
      reviewDate: [''], // تاريخ المراجعة
      publishProcedure: [''], // نشر الاجراء
      executionDuration: [''], // الوقت المستغرق لتنفيذ الاجراء

      procedurePreparation: [''], // اعداد الاجراء
      approver: [''], // معتمد الاجراء ( موظف )
      reviewedBy: [''], // المراجعة بواسطة
      procedureDescription: [''], // وصف الاجراء والهدف منه
      procedureDescriptionEn: [''], // وصف الاجراء والهدف منه (EN)
      inputDescription: [''], // وصف المدخل
      inputDescriptionEn: [''], // وصف المدخل (EN)
      outputs: [''], // المخرجات
      outputsEn: [''], // المخرجات (EN)
      eProcedureDevelopment: [''], // تطوير الاجراء لينفذ الكترونيا
      generalProcedure: [''], // مل الاجراء العام
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
    procedureName: 'اسم الاجراء',
    procedureNameEn: 'اسم الاجراء (EN)',
    procedureNumber: 'رقم الاجراء',
    department: 'الاداره',
    section: 'القسم',
    division: 'الشعبة',
    issueDate: 'تاريخ الاصدار',
    frequency: 'التكرار',
    executionPlace: 'مكان تنفيذ الاجراء',
    executionPlaceEn: 'مكان تنفيذ الاجراء (EN)',
    beneficiaries: 'المستفيدين',
    beneficiariesEn: 'المستفيدين (EN)',

    serviceProviders: 'مزودي الخدمة',
    lastUpdate: 'اخر تحديث على الاجراء',
    activationDate: 'تاريخ التفعيل',
    reviewDate: 'تاريخ المراجعة',
    publishProcedure: 'نشر الاجراء',
    executionDuration: 'الوقت المستغرق لتنفيذ الاجراء',

    procedurePreparation: 'اعداد الاجراء',
    approver: 'معتمد الاجراء ( موظف )',
    reviewedBy: 'المراجعة بواسطة',
    procedureDescription: 'وصف الاجراء والهدف منه',
    procedureDescriptionEn: 'وصف الاجراء والهدف منه (EN)',
    inputDescription: 'وصف المدخل',
    inputDescriptionEn: 'وصف المدخل (EN)',
    outputs: 'المخرجات',
    outputsEn: 'المخرجات (EN)',
    eProcedureDevelopment: 'تطوير الاجراء لينفذ الكترونيا',
    generalProcedure: 'مل الاجراء العام',
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
