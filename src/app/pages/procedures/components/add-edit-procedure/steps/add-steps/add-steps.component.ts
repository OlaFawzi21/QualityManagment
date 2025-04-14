import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-steps',
  templateUrl: './add-steps.component.html',
  styleUrl: './add-steps.component.scss',
})
export class AddStepsComponent {
  formGroup!: FormGroup;

  isLoading: boolean;

  id: string;
  editMode: boolean;

  data: any = {};
  steps: any[] = [];

  showDeleteSec = false;

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
      this.getData();
    } else {
      this.editMode = false;
    }

    this.formGroup = this.fb.group({
      stepName: [''], // اسم الخطوه
      stepNameEn: [''], // اسم الخطوه (EN)
      executor: [''], // المنفذ
      externalApprover: [''], // معتمد الاجراء (خارجي)
      externalApproverEn: [''], // معتمد الاجراء (خارجي) (EN)
      procedureName: [''], // اسم الاجراء
      formNumber: [''], // رقم النموذج
      reportNumber: [''], // رقم التقرير
      workflowNumber: [''], // رقم قائمه التدفق
      otherAttachments: [''], // المرفقات الأخرى
      archived: [false], // مؤرشف (checkbox or toggle)
      electronic: [false], // الكتروني (checkbox or toggle)
      manual: [false], // يدوي (checkbox or toggle)
    });
  }

  ngOnInit() {}

  getData() {
    // this.service.fun(this.id).subscribe({
    //   next: (res: any) => {
    //     this.jobTitle = res.data;
    //     console.log('API Response:', this.jobTitle);
    //   },
    // });
  }

  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      console.log(this.formGroup);
      return;
    }
    this.isLoading = true;
    if (this.editMode) {
      this.formGroup.get('id')?.enable();
      // this.this.service.fun(this.formGroup.value).subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     if (res.isSuccess) {
      //       this.isLoading = false;
      //       this.router.navigate(['/jobTitles']);
      //     }
      //   },
      // });
    } else {
      // this.this.service.fun(this.formGroup.value).subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     if (res.isSuccess) {
      //       this.isLoading = false;
      //       this.router.navigate(['/jobTitles']);
      //     }
      //   },
      // });
    }
  }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    const validFiles = event.addedFiles.filter((file:any) =>
      file.type.startsWith('image/')
    );
    if (validFiles.length) {
      this.files.push(...validFiles);
    } else {
      console.log('Invalid file type');
    }
    this.cdr.detectChanges();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
