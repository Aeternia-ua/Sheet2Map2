import { TestBed } from '@angular/core/testing';

import { SharedFilterFormService } from './shared-filter-form.service';

describe('SharedFilterFormService', () => {
  let service: SharedFilterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedFilterFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
