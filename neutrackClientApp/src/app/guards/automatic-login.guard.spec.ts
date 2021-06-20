import { TestBed } from '@angular/core/testing';

import { AutomaticLoginGuard } from './automatic-login.guard';

describe('AutomaticLoginGuard', () => {
  let guard: AutomaticLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutomaticLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
