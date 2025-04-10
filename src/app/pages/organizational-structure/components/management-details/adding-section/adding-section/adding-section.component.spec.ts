import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingSectionComponent } from './adding-section.component';

describe('AddingSectionComponent', () => {
  let component: AddingSectionComponent;
  let fixture: ComponentFixture<AddingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddingSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
