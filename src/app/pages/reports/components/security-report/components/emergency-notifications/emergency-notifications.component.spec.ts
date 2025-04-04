import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyNotificationsComponent } from './emergency-notifications.component';

describe('EmergencyNotificationsComponent', () => {
  let component: EmergencyNotificationsComponent;
  let fixture: ComponentFixture<EmergencyNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmergencyNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
