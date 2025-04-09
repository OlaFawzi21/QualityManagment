import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobResponspelitiesComponent } from './job-responspelities.component';

describe('JobResponspelitiesComponent', () => {
  let component: JobResponspelitiesComponent;
  let fixture: ComponentFixture<JobResponspelitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobResponspelitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobResponspelitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
