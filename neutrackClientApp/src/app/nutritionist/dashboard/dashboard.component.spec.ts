import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let fixture;
  let component: DashboardComponent;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
         MatTableModule, RouterTestingModule
      ],
      declarations: [ DashboardComponent ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
