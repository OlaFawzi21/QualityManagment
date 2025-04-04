import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeritageAllPlacesComponent } from './heritage-all-places.component';

describe('HeritageAllPlacesComponent', () => {
  let component: HeritageAllPlacesComponent;
  let fixture: ComponentFixture<HeritageAllPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeritageAllPlacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeritageAllPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
