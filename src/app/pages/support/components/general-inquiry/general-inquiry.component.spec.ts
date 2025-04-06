import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInquiryComponent } from './general-inquiry.component';

describe('GeneralInquiryComponent', () => {
  let component: GeneralInquiryComponent;
  let fixture: ComponentFixture<GeneralInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralInquiryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
