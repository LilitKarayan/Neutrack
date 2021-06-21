import { ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandlerService } from '../../services/http-error-handler.service';
import { MessageService } from '../../services/message.service';
import { MatRadioModule } from '@angular/material/radio';

import { SignUpComponent } from './sign-up.component';

describe('SignUpPatientComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [MatCardModule, MatInputModule, MatRadioModule, ReactiveFormsModule, MatFormFieldModule, RouterTestingModule, HttpClientModule],
      providers: [HttpErrorHandlerService, MessageService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form that is an instanceOf FormGroup', () => {
    component.ngOnInit();
    expect(component.form instanceof FormGroup).toBeTruthy();
  });

  it('should create formGroup with correct initial values for controls', () => {
    component.ngOnInit();
    expect(component.form.controls['email'].value).toEqual('');
    expect(component.form.controls['password'].value).toEqual('');
    expect(component.form.controls['firstName'].value).toEqual('');
    expect(component.form.controls['lastName'].value).toEqual('');
    expect(component.form.controls['dateOfBirth'].value).toEqual('');
    expect(component.form.controls['phoneNumber'].value).toEqual('');
    expect(component.form.controls['gender'].value).toEqual('');
    expect(component.form.controls['yearsOfExperience'].value).toEqual('');
  });

  it('should set values to form controls', () => {
    component.ngOnInit();

    component.form.setValue({
      email: 'test@test.com',
      password: 'uwG-1234',
      firstName: 'Johnny',
      lastName: 'test',
      dateOfBirth: '10/01/2003',
      phoneNumber: '123-456-7890',
      gender: 'Male',
      yearsOfExperience: '15'
    });

    expect(component.form.controls['email'].value).toEqual('test@test.com');
    expect(component.form.controls['password'].value).toEqual('uwG-1234');
    expect(component.form.controls['firstName'].value).toEqual('Johnny');
    expect(component.form.controls['lastName'].value).toEqual('test');
    expect(component.form.controls['dateOfBirth'].value).toEqual('10/01/2003');
    expect(component.form.controls['phoneNumber'].value).toEqual('123-456-7890');
    expect(component.form.controls['gender'].value).toEqual('Male');
    expect(component.form.controls['yearsOfExperience'].value).toEqual('15');
  });

  it('should have invalid controls initially', () => {
    component.ngOnInit();

    expect(component.form.controls['email'].invalid).toEqual(true);
    expect(component.form.controls['password'].invalid).toEqual(true);
    expect(component.form.controls['firstName'].invalid).toEqual(true);
    expect(component.form.controls['lastName'].invalid).toEqual(true);
    expect(component.form.controls['dateOfBirth'].invalid).toEqual(true);
    expect(component.form.controls['phoneNumber'].invalid).toEqual(true);
    expect(component.form.controls['gender'].invalid).toEqual(true);
    expect(component.form.controls['yearsOfExperience'].invalid).toEqual(true);
  });

  it('should clear values of form controls', () => {
    component.ngOnInit();

    component.form.setValue({
      email: 'test@test.com',
      password: 'uwG-1234',
      firstName: 'Johnny',
      lastName: 'test',
      dateOfBirth: '10/01/2003',
      phoneNumber: '123-456-7890',
      gender: 'Male',
      yearsOfExperience: '15'
    });

    expect(component.form.controls['email'].value).toEqual('test@test.com');
    expect(component.form.controls['password'].value).toEqual('uwG-1234');
    expect(component.form.controls['firstName'].value).toEqual('Johnny');
    expect(component.form.controls['lastName'].value).toEqual('test');
    expect(component.form.controls['dateOfBirth'].value).toEqual('10/01/2003');
    expect(component.form.controls['phoneNumber'].value).toEqual('123-456-7890');
    expect(component.form.controls['gender'].value).toEqual('Male');
    expect(component.form.controls['yearsOfExperience'].value).toEqual('15');

    component.clear();

    expect(component.form.controls['email'].value).toEqual(null);
    expect(component.form.controls['password'].value).toEqual(null);
    expect(component.form.controls['firstName'].value).toEqual(null);
    expect(component.form.controls['lastName'].value).toEqual(null);
    expect(component.form.controls['dateOfBirth'].value).toEqual(null);
    expect(component.form.controls['phoneNumber'].value).toEqual(null);
    expect(component.form.controls['gender'].value).toEqual(null);
    expect(component.form.controls['yearsOfExperience'].value).toEqual(null);
  });
});
