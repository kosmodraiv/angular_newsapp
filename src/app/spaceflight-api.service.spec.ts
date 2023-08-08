import { TestBed } from '@angular/core/testing';

import { SpaceflightApiService } from './spaceflight-api.service';

describe('SpaceflightApiService', () => {
  let service: SpaceflightApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceflightApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
