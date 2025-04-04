import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeritageDashboardComponent } from './heritage-dashboard.component';

describe('HeritageDashboardComponent', () => {
  let component: HeritageDashboardComponent;
  let fixture: ComponentFixture<HeritageDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeritageDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeritageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
