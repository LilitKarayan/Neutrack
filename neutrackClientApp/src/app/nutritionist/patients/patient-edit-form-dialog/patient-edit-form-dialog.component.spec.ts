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
import { PatientEditFormDialogComponent } from './patient-edit-form-dialog.component';

describe('PatientFormDialogComponent', () => {
  let component: PatientEditFormDialogComponent;
  let fixture: ComponentFixture<PatientEditFormDialogComponent>;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientEditFormDialogComponent ],
      imports: [MatDialogModule, BrowserModule ,
        FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: {} },
                  { provide: MAT_DIALOG_DATA, useValue: { id: 100000, name: 'John', gender: 'M', age: 30, email: 'johnsmith@gmail.com' } }]

    })
    .compileComponents();
    fixture = TestBed.createComponent(PatientEditFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form that is an instanceOf FormGroup', () => {
    component.ngOnInit();
    expect(component.formInstance instanceof FormGroup).toBeTruthy();
  });

  it('should create formGroup with correct initial values for controls', () => {
    component.ngOnInit();
    expect(component.formInstance.controls['name'].value).toEqual('John');
    expect(component.formInstance.controls['gender'].value).toEqual('M');
    expect(component.formInstance.controls['age'].value).toEqual(30);
    expect(component.formInstance.controls['email'].value).toEqual('johnsmith@gmail.com');
  });

  it('should set values to form controls', () => {
    component.ngOnInit();
    expect(component.formInstance.controls['name'].value).toEqual('John');
    expect(component.formInstance.controls['gender'].value).toEqual('M');
    expect(component.formInstance.controls['age'].value).toEqual(30);
    expect(component.formInstance.controls['email'].value).toEqual('johnsmith@gmail.com');
    
    component.formInstance.setValue({
      id: 1100,
      name: 'Lilit',
      gender: 'F',
      age: 29,
      email: 'test@test.com'
    });

    expect(component.formInstance.controls['name'].value).toEqual('Lilit');
    expect(component.formInstance.controls['gender'].value).toEqual('F');
    expect(component.formInstance.controls['age'].value).toEqual(29);
    expect(component.formInstance.controls['email'].value).toEqual('test@test.com');
  });

  
  it('should have invalid controls when fields are cleared', () => {
    component.ngOnInit();
    component.formInstance.setValue({
      id: 1900,
      name: '',
      gender: '',
      age: 29,
      email: ''
    });
    expect(component.formInstance.controls['name'].invalid).toEqual(true);
    expect(component.formInstance.controls['gender'].invalid).toEqual(true);
    expect(component.formInstance.controls['email'].invalid).toEqual(true);
  });

  it('should have invalid if not an email', () => {
    component.ngOnInit();

    component.formInstance.setValue({
      id: 1000,
      name: 'Lilit',
      gender: 'F',
      age: 29,
      email: 'test'
    })

    expect(component.formInstance.controls['email'].invalid).toEqual(true);
    expect(component.formInstance.controls['id'].invalid).toEqual(false);
    expect(component.formInstance.controls['name'].invalid).toEqual(false);
    expect(component.formInstance.controls['name'].invalid).toEqual(false);
    expect(component.formInstance.controls['age'].invalid).toEqual(false);

  });

  it('should be valid', () => {
    component.ngOnInit();

    component.formInstance.setValue({
      id: 1000,
      name: 'Lilit',
      gender: 'F',
      age: 29,
      email: 'test@gmail.com'
    })

    expect(component.formInstance.controls['email'].invalid).toEqual(false);
    expect(component.formInstance.controls['id'].invalid).toEqual(false);
    expect(component.formInstance.controls['name'].invalid).toEqual(false);
    expect(component.formInstance.controls['name'].invalid).toEqual(false);
    expect(component.formInstance.controls['age'].invalid).toEqual(false);

  });
});
