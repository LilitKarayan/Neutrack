import { TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { ToolbarComponent } from './toolbar.component';
import { HttpErrorHandlerService } from '../../app/services/http-error-handler.service';
import { MessageService } from '../../app/services/message.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ToolbarComponent', () => {
  let fixture;
  let component: ToolbarComponent;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      providers: [HttpErrorHandlerService, MessageService],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
