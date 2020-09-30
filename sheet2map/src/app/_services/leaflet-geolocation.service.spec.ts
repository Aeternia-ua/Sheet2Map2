import { TestBed } from '@angular/core/testing';

import { LeafletGeolocationService } from './leaflet-geolocation.service';

describe('LeafletGeolocationService', () => {
  let service: LeafletGeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafletGeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
