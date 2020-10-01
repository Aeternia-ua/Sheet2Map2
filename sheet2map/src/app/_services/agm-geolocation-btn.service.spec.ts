import { TestBed } from '@angular/core/testing';

import { AgmGeolocationControlService } from './agm-geolocation-control.service';

describe('AgmGeolocationBtnService', () => {
  let service: AgmGeolocationControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgmGeolocationControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
