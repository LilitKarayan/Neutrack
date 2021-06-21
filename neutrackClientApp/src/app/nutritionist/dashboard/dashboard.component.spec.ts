import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let fixture;
  let component: DashboardComponent;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
         MatTableModule, RouterTestingModule, BrowserAnimationsModule
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

  it('should include the title', () =>{
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const h1 = compiled.querySelector('h1');
    expect(h1.textContent).toContain('List of the active patients');
  });

  it('should include the pre-defined patient', () =>{
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const td = compiled.querySelector('td');
    expect(td.textContent).toContain('Lilit Karayan');
  })

});
