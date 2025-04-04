import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAndSafetyComponent } from './security-and-safety.component';

describe('SecurityAndSafetyComponent', () => {
  let component: SecurityAndSafetyComponent;
  let fixture: ComponentFixture<SecurityAndSafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurityAndSafetyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAndSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
