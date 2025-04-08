import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCommunicationComponent } from './employee-communication.component';

describe('EmployeeCommunicationComponent', () => {
  let component: EmployeeCommunicationComponent;
  let fixture: ComponentFixture<EmployeeCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeCommunicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
