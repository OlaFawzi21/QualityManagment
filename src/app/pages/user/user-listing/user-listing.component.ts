import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/_metronic/layout/core/services/users/users.service';
import { GeneralService } from 'src/app/_metronic/layout/core/services/general/general.service';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { GeneratePdfService } from 'src/app/_metronic/layout/core/services/reports/generate-pdf.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss'],
})
export class UserListingComponent implements OnInit, OnDestroy {
  @ViewChild('formModal') formModal: any;
  @ViewChild('deleteSwal') deleteSwal: SwalComponent;
  @ViewChild('successSwal') successSwal: SwalComponent;
  @ViewChild('successSwal1') successSwal1: SwalComponent;
  @ViewChild('successSwal2') successSwal2: SwalComponent;

  swalOptions: SweetAlertOptions = {
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  };

  private readonly _UsersService = inject(UsersService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _GeneralService = inject(GeneralService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _GeneratePdfService = inject(GeneratePdfService);

  isCollapsed1 = false;

  isLoading = false;
  userModel = { name: '', email: '', unit: '', floor: '' };
  editMode: boolean;

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  users: any[] = [];
  userId: any;
  title: string = 'جميع المستخدمين';
  selectedUserType: number = 0;

  userForm: FormGroup;

  assets: any = environment.assets;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.getAllUsers();
    this.initialUserForm();
  }

  initialUserForm() {
    this.userForm = this._FormBuilder.group({
      fullName: ['', Validators.required, Validators.minLength(4)],
      email: ['', [Validators.required, Validators.email]],
      identityNumber: ['', Validators.required],
      dataSourceId: ['', Validators.required],
      nationalityId: ['', Validators.required],
      roleName: ['', Validators.required],
      profilePicture: [''],
    });
  }

  getAllUsers() {
    const param = {
      PageIndex: Math.floor(this.first / this.rows) + 1,
      PageSize: this.rows,
    };
    this._UsersService.getAllUsers(param).subscribe({
      next: (res) => {
        this.users = res.body.data || [];
        const xPagination = res.headers.get('x-pagination');
        if (xPagination) {
          const paginationData = JSON.parse(xPagination);
          this.totalRecords = paginationData.TotalCount;
        }

        this.cdr.detectChanges();
      },
    });
  }

  getAllDataSourceEmployers() {
    const param = {
      PageIndex: Math.floor(this.first / this.rows) + 1,
      PageSize: this.rows,
    };
    this._UsersService.getAllDataSourceEmployers(param).subscribe({
      next: (res) => {
        this.users = res.body.data || [];
        const xPagination = res.headers.get('x-pagination');
        if (xPagination) {
          const paginationData = JSON.parse(xPagination);
          this.totalRecords = paginationData.TotalCount;
        }
        this.cdr.detectChanges();
      },
    });
  }

  getAllTourists() {
    const param = {
      PageIndex: Math.floor(this.first / this.rows) + 1,
      PageSize: this.rows,
    };
    this._UsersService.getAllTourists(param).subscribe({
      next: (res) => {
        this.users = res.body.data || [];
        const xPagination = res.headers.get('x-pagination');
        if (xPagination) {
          const paginationData = JSON.parse(xPagination);
          this.totalRecords = paginationData.TotalCount;
        }
        this.cdr.detectChanges();
      },
    });
  }

  handleSelectionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.selectedUserType = Number(selectedValue);
    console.log(this.selectedUserType);
    this.applyFilter(Number(selectedValue));
  }

  applyFilter(value: number) {
    if (value === 0) {
      this.title = 'جميع المستخدمين';
      this.getAllUsers();
    } else if (value === 1) {
      this.title = 'الموظفين';
      this.getAllDataSourceEmployers();
    } else if (value === 2) {
      this.title = 'مستخدمي الموقع';
      this.getAllTourists();
    }
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    const selectedValue = (
      document.querySelector('select') as HTMLSelectElement
    )?.value;
    this.applyFilter(Number(selectedValue));
  }

  openEditModal(user: any) {
    this.userModel = { ...user };
    this.openModal(this.formModal);
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      console.log(this.userForm.value);
      return;
    }

    if (!this.editMode)
      this._UsersService.createUser(this.userForm.value).subscribe({
        next: (res) => {
          this.successSwal1.fire();
        },
      });
    else if (this.editMode) {
      console.log(this.userForm.value);
      this.userForm.get('id')?.enable();
      this._UsersService.updateUser(this.userForm.value).subscribe({
        next: () => {
          this.successSwal2.fire();
          const selectedValue = (
            document.querySelector('select') as HTMLSelectElement
          )?.value;
          this.applyFilter(Number(selectedValue));
        },
      });
    }
  }

  openModal(modal: any) {
    this.modalService.open(modal, {
      centered: true,
    });
    if (this.userModel.name) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  resetForm() {
    this.userForm.reset();
  }

  openDeleteSwal(id: number) {
    this.deleteSwal.fire();
    this.userId = id;
  }
  triggerDelete() {
    this._UsersService.deleteUser(this.userId).subscribe({
      next: () => {
        this.successSwal.fire();
        const selectedValue = (
          document.querySelector('select') as HTMLSelectElement
        )?.value;
        this.applyFilter(Number(selectedValue));
      },
    });
  }

  onImagesSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.uploadImage(Array.from(files));
    }
  }

  imageName: any = '';
  folderName: any = '';
  isFileSelected1: boolean = false;

  onFileSelected1(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isFileSelected1 = !!input?.files?.length;
  }

  uploadImage(files: File[]) {
    this.folderName = this.imageName;
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    this._GeneralService.uploadImage(formData, this.folderName).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);
        if (response.body) {
          console.log('تم رفع الصور بنجاح!');
          this.userForm.get('profilePicture')?.setValue(response.body.data[0]);
          this.cdr.detectChanges();
        }
      },
      error: () => {
        console.log('فشل رفع الصور.');
      },
    });
  }

  exportPDF(userId: number) {
    this._UsersService.userActivityReport(userId).subscribe(
      (res: any) => {
        console.log('API Response:', res);
        const responseBody = res.body ? res.body : res;
        if (responseBody?.data) {
          this._GeneratePdfService.dwonloadWithAuth(
            { file: responseBody.data, fileName: 'Tourist.pdf' },
            'pdf'
          );
        } else {
          console.error(
            'Invalid response format or missing file data',
            responseBody
          );
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  ngOnDestroy(): void {}
}
