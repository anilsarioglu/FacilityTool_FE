import { TestBed } from '@angular/core/testing';

import { ExFirmService } from './ex-firm.service';

describe('ExFirmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExFirmService = TestBed.get(ExFirmService);
    expect(service).toBeTruthy();
  });
});
