import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditRecipeComponent } from './add-edit-recipe.component';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AddEditRecipeComponent', () => {
  let component: AddEditRecipeComponent;
  let fixture: ComponentFixture<AddEditRecipeComponent>;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRecipeComponent ],
      imports: [
        MatDialogModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddEditRecipeComponent);
    component = fixture.componentInstance;
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
    expect(component.formInstance.controls['instruction'].value).toEqual('');
  });

  it('should have invalid controls initially', () => {
    component.ngOnInit();

    expect(component.formInstance.controls['name'].invalid).toEqual(true);
    expect(component.formInstance.controls['instruction'].invalid).toEqual(true);
  });

  it('should set values to form controls', () => {
    component.ngOnInit();

    component.formInstance.setValue({
      name: 'Pepperoni Pizza',
      instruction: "Take dough. Place in oven at 350 degrees for 15 minutes...",
      recipeProducts: []
    });


    expect(component.formInstance.controls['name'].value).toEqual('Pepperoni Pizza');
    expect(component.formInstance.controls['instruction'].value).toEqual("Take dough. Place in oven at 350 degrees for 15 minutes...");
  });
});
