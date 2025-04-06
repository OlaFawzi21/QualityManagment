import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTermsAndPrivacyComponent } from './all-terms-and-privacy.component';

describe('AllTermsAndPrivacyComponent', () => {
  let component: AllTermsAndPrivacyComponent;
  let fixture: ComponentFixture<AllTermsAndPrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTermsAndPrivacyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTermsAndPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
