import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTermsAndPrivacyComponent } from './add-edit-terms-and-privacy.component';

describe('AddEditTermsAndPrivacyComponent', () => {
  let component: AddEditTermsAndPrivacyComponent;
  let fixture: ComponentFixture<AddEditTermsAndPrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditTermsAndPrivacyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTermsAndPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
