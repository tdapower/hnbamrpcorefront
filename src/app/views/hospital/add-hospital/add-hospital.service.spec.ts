import { TestBed } from '@angular/core/testing';

import { AddHospitalService } from './add-hospital.service';

describe('AddHospitalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddHospitalService = TestBed.get(AddHospitalService);
    expect(service).toBeTruthy();
  });
});
