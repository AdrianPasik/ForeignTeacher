import { TestBed } from '@angular/core/testing';

import { ProgressLoader } from './progress';

describe('Progress', () => {
  let service: ProgressLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
