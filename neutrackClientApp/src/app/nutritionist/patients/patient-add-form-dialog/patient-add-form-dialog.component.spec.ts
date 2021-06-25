import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientAddFormDialogComponent } from './patient-add-form-dialog.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PatientAddFormDialogComponent', () => {
  let component: PatientAddFormDialogComponent;
  let fixture: ComponentFixture<PatientAddFormDialogComponent>;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAddFormDialogComponent ],
      imports: [MatDialogModule, BrowserModule ,
        FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: {} }]

    })
    .compileComponents();
    fixture = TestBed.createComponent(PatientAddFormDialogComponent);
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
    expect(component.formInstance.controls['name'].value).toEqual('');
    expect(component.formInstance.controls['gender'].value).toEqual('');
    expect(component.formInstance.controls['age'].value).toEqual(0);
    expect(component.formInstance.controls['email'].value).toEqual('');
  });

  it('should set values to form controls', () => {
    component.ngOnInit();
    expect(component.formInstance.controls['name'].value).toEqual('');
    expect(component.formInstance.controls['gender'].value).toEqual('');
    expect(component.formInstance.controls['age'].value).toEqual(0);
    expect(component.formInstance.controls['email'].value).toEqual('');
    
    component.formInstance.setValue({
      id: 1000,
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

  
  it('should have invalid controls initially', () => {
    component.ngOnInit();

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
      gender: 'Female',
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
