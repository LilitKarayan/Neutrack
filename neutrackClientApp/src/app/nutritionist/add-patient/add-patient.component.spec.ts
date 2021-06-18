import { TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

import { AddPatientComponent } from './add-patient.component';

describe('AddPatientComponent', () => {
  let fixture;
  let component: AddPatientComponent;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddPatientComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
