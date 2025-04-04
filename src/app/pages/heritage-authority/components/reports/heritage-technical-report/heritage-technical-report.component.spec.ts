import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeritageTechnicalReportComponent } from './heritage-technical-report.component';

describe('HeritageTechnicalReportComponent', () => {
  let component: HeritageTechnicalReportComponent;
  let fixture: ComponentFixture<HeritageTechnicalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeritageTechnicalReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeritageTechnicalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
