import { TestBed } from '@angular/core/testing';

import { InfoSidebarToggleService } from './info-sidebar-toggle.service';

describe('InfoSidebarToggleService', () => {
  let service: InfoSidebarToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoSidebarToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
