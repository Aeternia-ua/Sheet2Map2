import { TestBed } from '@angular/core/testing';

import { AgmMarkerService } from './agm-marker.service';

describe('AgmMarkerService', () => {
  let service: AgmMarkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgmMarkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
