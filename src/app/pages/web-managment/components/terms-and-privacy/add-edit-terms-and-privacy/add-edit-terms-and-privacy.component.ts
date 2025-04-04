import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-terms-and-privacy',
  templateUrl: './add-edit-terms-and-privacy.component.html',
  styleUrls: ['./add-edit-terms-and-privacy.component.scss'],
})
export class AddEditTermsAndPrivacyComponent {
  formGroup!: FormGroup;

  id: string;
  editMode: boolean;

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
