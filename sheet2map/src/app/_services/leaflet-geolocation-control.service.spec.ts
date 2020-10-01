import { TestBed } from '@angular/core/testing';

import { LeafletGeolocationControlService } from './leaflet-geolocation-control.service';

describe('LeafletGeolocationControlService', () => {
  let service: LeafletGeolocationControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafletGeolocationControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
