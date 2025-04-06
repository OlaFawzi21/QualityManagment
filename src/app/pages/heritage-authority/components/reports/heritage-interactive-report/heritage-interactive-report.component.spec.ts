import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeritageInteractiveReportComponent } from './heritage-interactive-report.component';

describe('HeritageInteractiveReportComponent', () => {
  let component: HeritageInteractiveReportComponent;
  let fixture: ComponentFixture<HeritageInteractiveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeritageInteractiveReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeritageInteractiveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
