import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClarificationsComponent } from './add-clarifications.component';

describe('AddClarificationsComponent', () => {
  let component: AddClarificationsComponent;
  let fixture: ComponentFixture<AddClarificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddClarificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClarificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
