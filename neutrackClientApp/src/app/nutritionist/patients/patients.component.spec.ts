import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { PatientsComponent } from './patients.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';

describe('PatientsComponent', () => {
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule, MatSortModule, MatTableModule, RouterTestingModule
      ],
      declarations: [ PatientsComponent ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });


  it('should create', () => {
    let fixture = TestBed.createComponent(PatientsComponent);
    let component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
