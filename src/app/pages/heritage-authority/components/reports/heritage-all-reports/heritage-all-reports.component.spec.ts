import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeritageAllReportsComponent } from './heritage-all-reports.component';

describe('HeritageAllReportsComponent', () => {
  let component: HeritageAllReportsComponent;
  let fixture: ComponentFixture<HeritageAllReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeritageAllReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeritageAllReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
