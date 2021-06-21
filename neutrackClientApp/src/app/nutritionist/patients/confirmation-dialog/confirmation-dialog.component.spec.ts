import { ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let fixture;
  let component: ConfirmationDialogComponent;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
