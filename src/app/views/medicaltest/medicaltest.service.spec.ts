import { TestBed } from '@angular/core/testing';

import { MedicaltestService } from './medicaltest.service';

describe('MedicaltestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicaltestService = TestBed.get(MedicaltestService);
    expect(service).toBeTruthy();
  });
});
