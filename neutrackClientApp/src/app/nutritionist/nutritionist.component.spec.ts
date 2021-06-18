import { TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { NutritionistComponent } from './nutritionist.component';

describe('NutritionistComponent', () => {
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionistComponent ]
    })
    .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NutritionistComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
