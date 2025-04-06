import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSafetyComponent } from './public-safety.component';

describe('PublicSafetyComponent', () => {
  let component: PublicSafetyComponent;
  let fixture: ComponentFixture<PublicSafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicSafetyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
