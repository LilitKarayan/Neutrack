import { NO_ERRORS_SCHEMA } from '@angular/core';
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

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [MatCardModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule, RouterTestingModule, HttpClientModule],
      providers: [HttpErrorHandlerService, MessageService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
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
  });

  it('should set values to form controls', () => {
    component.ngOnInit();
    expect(component.form.controls['email'].value).toEqual('');
    expect(component.form.controls['password'].value).toEqual('');
    
    component.form.setValue({
      email: 'test@test.com',
      password: 'uwG-1234'
    });

    expect(component.form.controls['email'].value).toEqual('test@test.com');
    expect(component.form.controls['password'].value).toEqual('uwG-1234');
  });

  it('should clear values of form controls', () => {
    component.ngOnInit();

    component.form.setValue({
      email: 'test@test.com',
      password: 'uwG-1234'
    });

    expect(component.form.controls['email'].value).toEqual('test@test.com');
    expect(component.form.controls['password'].value).toEqual('uwG-1234');

    component.clear();

    expect(component.form.controls['email'].value).toEqual(null);
    expect(component.form.controls['password'].value).toEqual(null);
  });

  it('should have invalid controls initially', () => {
    component.ngOnInit();

    expect(component.form.controls['email'].invalid).toEqual(true);
    expect(component.form.controls['password'].invalid).toEqual(true);
  });

  it('should have invalid if not an email', () => {
    component.ngOnInit();

    component.form.setValue({
      email: 'test',
      password: 'Medicine1531!'
    })

    expect(component.form.controls['email'].invalid).toEqual(true);
    expect(component.form.controls['password'].invalid).toEqual(false);
  });

  it('should be valid', () => {
    component.ngOnInit();

    component.form.setValue({
      email: 'test@test.com',
      password: 'Medicine1531!'
    })

    expect(component.form.controls['email'].invalid).toEqual(false);
    expect(component.form.controls['password'].invalid).toEqual(false);
  });
});
