import { TestBed } from '@angular/core/testing';

import { SignUpNutritionistServiceService } from './sign-up-nutritionist-service.service';

describe('SignUpNutritionistServiceService', () => {
  let service: SignUpNutritionistServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpNutritionistServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
