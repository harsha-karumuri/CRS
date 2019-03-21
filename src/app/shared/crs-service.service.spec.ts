import { TestBed } from '@angular/core/testing';

import { CrsServiceService } from './crs-service.service';

describe('CrsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrsServiceService = TestBed.get(CrsServiceService);
    expect(service).toBeTruthy();
  });
});
