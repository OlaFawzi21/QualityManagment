import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDetailComponent } from './procedure-detail.component';

describe('ProcedureDetailComponent', () => {
  let component: ProcedureDetailComponent;
  let fixture: ComponentFixture<ProcedureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcedureDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
