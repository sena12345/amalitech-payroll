import { TestBed } from '@angular/core/testing';

import { EndPointsService } from './end-points.service';

describe('EndPointsService', () => {
  let service: EndPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
