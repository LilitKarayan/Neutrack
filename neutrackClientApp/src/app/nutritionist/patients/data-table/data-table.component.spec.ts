import { TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let fixture;
  let component: DataTableComponent;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
