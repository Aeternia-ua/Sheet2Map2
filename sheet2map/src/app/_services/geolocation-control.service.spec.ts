import { TestBed } from '@angular/core/testing';

import { GeolocationControlService } from './geolocation-control.service';

describe('AgmGeolocationBtnService', () => {
  let service: GeolocationControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
