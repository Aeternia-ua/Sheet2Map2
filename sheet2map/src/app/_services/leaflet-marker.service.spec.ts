import { TestBed } from '@angular/core/testing';

import { LeafletMarkerService } from './leaflet-marker.service';

describe('MarkerService', () => {
  let service: LeafletMarkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafletMarkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
