import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDeletedComponent } from './job-deleted.component';

describe('JobDeletedComponent', () => {
  let component: JobDeletedComponent;
  let fixture: ComponentFixture<JobDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDeletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
