import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAddFormDialogComponent } from './patient-add-form-dialog.component';

describe('PatientAddFormDialogComponent', () => {
  let component: PatientAddFormDialogComponent;
  let fixture: ComponentFixture<PatientAddFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAddFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAddFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
