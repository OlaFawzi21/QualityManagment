import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorStatisticComponent } from './visitor-statistic.component';

describe('VisitorStatisticComponent', () => {
  let component: VisitorStatisticComponent;
  let fixture: ComponentFixture<VisitorStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitorStatisticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
