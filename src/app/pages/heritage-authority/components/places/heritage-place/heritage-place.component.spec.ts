import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeritagePlaceComponent } from './heritage-place.component';

describe('HeritagePlaceComponent', () => {
  let component: HeritagePlaceComponent;
  let fixture: ComponentFixture<HeritagePlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeritagePlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeritagePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
