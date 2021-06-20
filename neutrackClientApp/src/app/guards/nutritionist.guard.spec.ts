import { TestBed } from '@angular/core/testing';

import { NutritionistGuard } from './nutritionist.guard';

describe('NutritionistGuard', () => {
  let guard: NutritionistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NutritionistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
