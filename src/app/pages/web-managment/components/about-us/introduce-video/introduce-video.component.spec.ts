import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduceVideoComponent } from './introduce-video.component';

describe('IntroduceVideoComponent', () => {
  let component: IntroduceVideoComponent;
  let fixture: ComponentFixture<IntroduceVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroduceVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroduceVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
