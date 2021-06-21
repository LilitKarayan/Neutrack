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

import { CalculatorFormComponent } from './calculator-form.component';

describe('CalculatorFormComponent', () => {
  let component: CalculatorFormComponent;
  let fixture: ComponentFixture<CalculatorFormComponent>;

  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorFormComponent ],
      imports: [MatCardModule, MatInputModule, MatRadioModule, ReactiveFormsModule, MatFormFieldModule, RouterTestingModule, HttpClientModule],
      providers: [HttpErrorHandlerService, MessageService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CalculatorFormComponent);
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
    expect(component.form.controls['height'].value).toEqual('');
    expect(component.form.controls['weight'].value).toEqual('');
    expect(component.form.controls['goal'].value).toEqual('');
    expect(component.form.controls['activityLevel'].value).toEqual('');
    expect(component.form.controls['age'].value).toEqual('');
    expect(component.form.controls['gender'].value).toEqual('');
  });

  
  it('should set values to form controls', () => {
    component.ngOnInit();

    component.form.setValue({
      height: 99,
      weight: 300,
      goal: 230,
      activityLevel: 1,
      age: 32,
      gender: 'Other'
    });

    expect(component.form.controls['height'].value).toEqual(99);
    expect(component.form.controls['weight'].value).toEqual(300);
    expect(component.form.controls['goal'].value).toEqual(230);
    expect(component.form.controls['activityLevel'].value).toEqual(1);
    expect(component.form.controls['age'].value).toEqual(32);
    expect(component.form.controls['gender'].value).toEqual('Other');
  });

  it('should have invalid controls initially', () => {
    component.ngOnInit();

    expect(component.form.controls['height'].invalid).toEqual(true);
    expect(component.form.controls['weight'].invalid).toEqual(true);
    expect(component.form.controls['goal'].invalid).toEqual(true);
    expect(component.form.controls['activityLevel'].invalid).toEqual(true);
    expect(component.form.controls['age'].invalid).toEqual(true);
    expect(component.form.controls['gender'].invalid).toEqual(true);
  });

  it('should clear values of form controls', () => {
    component.ngOnInit();

    component.form.setValue({
      height: 99,
      weight: 300,
      goal: 230,
      activityLevel: 1,
      age: 32,
      gender: 'Other'
    });

    expect(component.form.controls['height'].value).toEqual(99);
    expect(component.form.controls['weight'].value).toEqual(300);
    expect(component.form.controls['goal'].value).toEqual(230);
    expect(component.form.controls['activityLevel'].value).toEqual(1);
    expect(component.form.controls['age'].value).toEqual(32);
    expect(component.form.controls['gender'].value).toEqual('Other');

    component.clear();

    expect(component.form.controls['height'].value).toEqual(null);
    expect(component.form.controls['weight'].value).toEqual(null);
    expect(component.form.controls['goal'].value).toEqual(null);
    expect(component.form.controls['activityLevel'].value).toEqual(null);
    expect(component.form.controls['age'].value).toEqual(null);
    expect(component.form.controls['gender'].value).toEqual(null);
  });
});
