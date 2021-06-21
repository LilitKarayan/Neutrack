import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Patient } from '../../../core/models/patient';
import { PatientInfoComponent } from './patient-info.component';

describe('PatientInfoComponent', () => {
  let component: PatientInfoComponent;
  let fixture: ComponentFixture<PatientInfoComponent>;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientInfoComponent ],
      imports: [MatDialogModule, BrowserModule ,
        FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: {} },
                  { provide: MAT_DIALOG_DATA, useValue: { id: 100000, name: 'John', gender: 'M', age: 30, email: 'johnsmith@gmail.com' } }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include the title as the name of the patient', () =>{
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const h1 = compiled.querySelector('h1');
    expect(h1.textContent).toContain('John');
  });
});
