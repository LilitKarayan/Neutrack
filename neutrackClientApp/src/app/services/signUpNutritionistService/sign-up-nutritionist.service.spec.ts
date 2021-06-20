import { TestBed } from '@angular/core/testing';

import { SignUpNutritionistService } from './sign-up-nutritionist.service';

describe('SignUpNutritionistService', () => {
  let service: SignUpNutritionistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpNutritionistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
