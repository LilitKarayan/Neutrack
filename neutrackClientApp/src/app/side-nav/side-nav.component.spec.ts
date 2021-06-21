import { TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { SideNavComponent } from './side-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandlerService } from '../../app/services/http-error-handler.service';
import { MessageService } from '../../app/services/message.service'

describe('SideNavComponent', () => {
  let fixture;
  let component: SideNavComponent;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ SideNavComponent ],
      providers: [HttpErrorHandlerService, MessageService]
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
