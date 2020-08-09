import { TestBed } from '@angular/core/testing';

import { InfoSidebarService } from './info-sidebar.service';

describe('InfoSidebarService', () => {
  let service: InfoSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
