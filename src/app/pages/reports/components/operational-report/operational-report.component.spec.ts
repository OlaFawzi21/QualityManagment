import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalReportComponent } from './operational-report.component';

describe('OperationalReportComponent', () => {
  let component: OperationalReportComponent;
  let fixture: ComponentFixture<OperationalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationalReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
