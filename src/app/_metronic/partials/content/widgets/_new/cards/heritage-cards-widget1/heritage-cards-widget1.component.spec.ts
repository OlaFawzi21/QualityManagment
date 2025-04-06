import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeritageCardsWidget1Component } from './heritage-cards-widget1.component';

describe('HeritageCardsWidget1Component', () => {
  let component: HeritageCardsWidget1Component;
  let fixture: ComponentFixture<HeritageCardsWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeritageCardsWidget1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeritageCardsWidget1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
