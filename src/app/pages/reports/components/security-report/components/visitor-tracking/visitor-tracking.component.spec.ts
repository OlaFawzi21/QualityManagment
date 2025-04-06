import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorTrackingComponent } from './visitor-tracking.component';

describe('VisitorTrackingComponent', () => {
  let component: VisitorTrackingComponent;
  let fixture: ComponentFixture<VisitorTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitorTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
