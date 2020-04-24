import { TestBed } from '@angular/core/testing';

import { MeldingsrvServiceService } from './meldingsrv-service.service';

describe('MeldingsrvServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeldingsrvServiceService = TestBed.get(MeldingsrvServiceService);
    expect(service).toBeTruthy();
  });
});
