import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsWidget19Component } from './cards-widget19.component';

describe('CardsWidget19Component', () => {
  let component: CardsWidget19Component;
  let fixture: ComponentFixture<CardsWidget19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsWidget19Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsWidget19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
