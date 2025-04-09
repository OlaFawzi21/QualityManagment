import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureRecordComponent } from './signature-record.component';

describe('SignatureRecordComponent', () => {
  let component: SignatureRecordComponent;
  let fixture: ComponentFixture<SignatureRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignatureRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
