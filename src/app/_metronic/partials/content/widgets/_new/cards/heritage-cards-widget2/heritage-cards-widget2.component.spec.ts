import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeritageCardsWidget2Component } from './heritage-cards-widget2.component';

describe('HeritageCardsWidget2Component', () => {
  let component: HeritageCardsWidget2Component;
  let fixture: ComponentFixture<HeritageCardsWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeritageCardsWidget2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeritageCardsWidget2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
