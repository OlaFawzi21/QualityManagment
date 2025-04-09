import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureLogComponent } from './signature-log.component';

describe('SignatureLogComponent', () => {
  let component: SignatureLogComponent;
  let fixture: ComponentFixture<SignatureLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignatureLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
