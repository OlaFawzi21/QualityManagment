import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPerformanceComponent } from './app-performance.component';

describe('AppPerformanceComponent', () => {
  let component: AppPerformanceComponent;
  let fixture: ComponentFixture<AppPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
