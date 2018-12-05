import { TestBed } from '@angular/core/testing';

import { SearchHospitalService } from './search-hospital.service';

describe('SearchHospitalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchHospitalService = TestBed.get(SearchHospitalService);
    expect(service).toBeTruthy();
  });
});
