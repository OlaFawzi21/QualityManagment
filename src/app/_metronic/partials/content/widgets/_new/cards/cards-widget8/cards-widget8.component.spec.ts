import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsWidget8Component } from './cards-widget8.component';

describe('CardsWidget8Component', () => {
  let component: CardsWidget8Component;
  let fixture: ComponentFixture<CardsWidget8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsWidget8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsWidget8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
