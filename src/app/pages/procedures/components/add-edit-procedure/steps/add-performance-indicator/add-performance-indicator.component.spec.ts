import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerformanceIndicatorComponent } from './add-performance-indicator.component';

describe('AddPerformanceIndicatorComponent', () => {
  let component: AddPerformanceIndicatorComponent;
  let fixture: ComponentFixture<AddPerformanceIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPerformanceIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPerformanceIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
