import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHailComponent } from './about-hail.component';

describe('AboutHailComponent', () => {
  let component: AboutHailComponent;
  let fixture: ComponentFixture<AboutHailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutHailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutHailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
