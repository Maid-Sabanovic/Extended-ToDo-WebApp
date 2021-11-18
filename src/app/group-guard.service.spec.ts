import { TestBed } from '@angular/core/testing';

import { GroupGuardService } from './group-guard.service';

describe('GroupGuardService', () => {
  let service: GroupGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
