import { TestBed } from '@angular/core/testing';

import { DomicilioGuard } from './domicilio.guard';

describe('DomicilioGuard', () => {
  let guard: DomicilioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DomicilioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
