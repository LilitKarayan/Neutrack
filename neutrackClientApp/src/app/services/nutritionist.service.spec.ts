import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import 'rxjs/add/operator/map';
import { NutritionistService } from './nutritionist.service';

describe('NutritionistService', () => {
  let service: NutritionistService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeAll(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
    platformBrowserDynamicTesting());
  })
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NutritionistService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
