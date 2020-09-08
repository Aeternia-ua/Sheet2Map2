import { TestBed } from '@angular/core/testing';

import { SharedMarkerInfoService } from './shared-marker-info.service';

describe('SharedService', () => {
  let service: SharedMarkerInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedMarkerInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
