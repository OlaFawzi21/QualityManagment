import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalLibraryComponent } from './medical-library.component';

describe('MedicalLibraryComponent', () => {
  let component: MedicalLibraryComponent;
  let fixture: ComponentFixture<MedicalLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
