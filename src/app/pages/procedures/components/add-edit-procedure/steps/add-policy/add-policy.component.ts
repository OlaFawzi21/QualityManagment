import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrl: './add-policy.component.scss',
})
export class AddPolicyComponent {
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
      id: [{ value: null, disabled: true }],
      clarificationName: ['', [Validators.required]],
      clarificationNameEn: ['', [Validators.required]],
      stepName: ['', [Validators.required]],
      type: ['', [Validators.required]],
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
}
