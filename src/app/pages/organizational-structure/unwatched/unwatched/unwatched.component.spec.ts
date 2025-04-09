import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnwatchedComponent } from './unwatched.component';

describe('UnwatchedComponent', () => {
  let component: UnwatchedComponent;
  let fixture: ComponentFixture<UnwatchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnwatchedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnwatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
