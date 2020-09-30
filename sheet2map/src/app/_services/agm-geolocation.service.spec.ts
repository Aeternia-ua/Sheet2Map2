import { TestBed } from '@angular/core/testing';

import { AgmGeolocationService } from './agm-geolocation.service';

describe('AgmGeolocationService', () => {
  let service: AgmGeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgmGeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
