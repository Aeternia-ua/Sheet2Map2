import { TestBed } from '@angular/core/testing';

import { MarkerProviderService } from './marker-provider.service';

describe('MarkerProviderService', () => {
  let service: MarkerProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
