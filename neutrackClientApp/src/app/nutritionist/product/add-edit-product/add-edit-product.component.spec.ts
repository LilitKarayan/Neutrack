import { ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { AddEditProductComponent } from './add-edit-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';


describe('AddEditProductComponent', () => {
  let component: AddEditProductComponent;
  let fixture: ComponentFixture<AddEditProductComponent>;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProductComponent ],
      imports: [MatDialogModule, BrowserModule ,
        FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, BrowserAnimationsModule, RouterTestingModule, HttpClientModule],
      providers: [
        {
          provide: MatDialogRef, 
          useValue: {}
        }, 
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: {}
        }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddEditProductComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
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
    expect(component.formInstance.controls['caloriesPerGram'].value).toEqual(0);
    expect(component.formInstance.controls['proteinInGrams'].value).toEqual(0);
    expect(component.formInstance.controls['fatInGrams'].value).toEqual(0);
    expect(component.formInstance.controls['carbInGrams'].value).toEqual(0);
  });

  it('should have invalid controls initially', () => {
    component.ngOnInit();

    expect(component.formInstance.controls['name'].invalid).toEqual(true);
    expect(component.formInstance.controls['caloriesPerGram'].invalid).toEqual(true);
    expect(component.formInstance.controls['fatInGrams'].invalid).toEqual(false);
    expect(component.formInstance.controls['proteinInGrams'].invalid).toEqual(false);
    expect(component.formInstance.controls['carbInGrams'].invalid).toEqual(false);
  });

  it('should set values to form controls', () => {
    component.ngOnInit();

    component.formInstance.setValue({
      name: 'pie',
      caloriesPerGram: 200,
      fatInGrams: 20,
      proteinInGrams: 4,
      carbInGrams: 60
    });

    expect(component.formInstance.controls['name'].value).toEqual('pie');
    expect(component.formInstance.controls['caloriesPerGram'].value).toEqual(200);
    expect(component.formInstance.controls['fatInGrams'].value).toEqual(20);
    expect(component.formInstance.controls['proteinInGrams'].value).toEqual(4);
    expect(component.formInstance.controls['carbInGrams'].value).toEqual(60);
  });
});
