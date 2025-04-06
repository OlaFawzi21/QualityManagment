import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  // notificationForm: FormGroup;
  // isLoading = false;

  // ngOnInit() {
  //   this.notificationForm = new FormGroup({
  //     checked1:  new FormControl('',),
  //     checked2:  new FormControl('',),
  //     checked3:  new FormControl('',),
  //   })
  // }

  // submitForm() {
  //   if (this.notificationForm.invalid) {
  //     this.notificationForm.markAllAsTouched();
  //     return;
  //   }

  //   this.isLoading = true;
  //   console.log(this.notificationForm.value);
  // }
  title: string = '';
  content: string = '';

  onSubmit() {
    console.log('Title:', this.title);
    console.log('Content:', this.content);
  }
}
