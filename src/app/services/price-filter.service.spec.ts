import { TestBed } from '@angular/core/testing';

import { PriceFilterService } from './price-filter.service';

describe('PriceFilterService', () => {
  let service: PriceFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
