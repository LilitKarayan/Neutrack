import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMainComponent } from './patient-main.component';

describe('PatientMainComponent', () => {
  let component: PatientMainComponent;
  let fixture: ComponentFixture<PatientMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
