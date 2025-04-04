import { NgModule } from '@angular/core';
import { KeeniconComponent } from './keenicon/keenicon.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { EditorModule } from 'primeng/editor';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileInputComponent } from './file-input/file-input.component';

import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CheckboxModule } from 'primeng/checkbox';
import { ImagePipePipe } from './pipes/imagePipe.pipe';
import { TextPipePipe } from './pipes/textPipe.pipe';
import { TransTypePipe } from './pipes/transType.pipe';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SupportPipe } from './pipes/support.pipe';
import { SvgPipe } from './pipes/svg.pipe';
@NgModule({
  declarations: [
    KeeniconComponent,
    FileInputComponent,
    ImagePipePipe,
    TextPipePipe,
    TransTypePipe,
    SupportPipe,
    SvgPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule,
    RadioButtonModule,
    EditorModule,
    ScrollPanelModule,
    NgxDropzoneModule,
    StepperModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    CheckboxModule,
    ToastModule,
    MultiSelectModule,
    RatingModule,
    DropdownModule,
    CalendarModule,
  ],
  exports: [
    KeeniconComponent,
    ReactiveFormsModule,
    PaginatorModule,
    RadioButtonModule,
    EditorModule,
    ScrollPanelModule,
    NgxDropzoneModule,
    FileInputComponent,
    StepperModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    CheckboxModule,
    ImagePipePipe,
    TextPipePipe,
    TransTypePipe,
    ToastModule,
    MultiSelectModule,
    RatingModule,
    DropdownModule,
    CalendarModule,
    SupportPipe,
    SvgPipe,
  ],
})
export class SharedModule {}
