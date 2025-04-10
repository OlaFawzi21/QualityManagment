import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-procedure',
  templateUrl: './add-edit-procedure.component.html',
  styleUrl: './add-edit-procedure.component.scss',
})
export class AddEditProcedureComponent {
  id: string;
  editMode: boolean;

  items: any;

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
    } else {
      this.editMode = false;
    }
  }


  ngOnInit() {
    this.items = [
      {
        label: 'الإجراء',
        routerLink: 'procedure',
      },
      {
        label: 'الخطوات',
        routerLink: 'steps',
      },
      {
        label: 'سياسات و شروط الإجراء',
        routerLink: 'policy',
      },
      {
        label: 'ايضاحات الإجراء',
        routerLink: 'clarification',
      },
      {
        label: 'مؤشر الأداء',
        routerLink: 'performanceIndicator',
      },
    ];
  }
}
