import { TestBed } from '@angular/core/testing';

import { EditHospitalService } from './edit-hospital.service';

describe('EditHospitalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditHospitalService = TestBed.get(EditHospitalService);
    expect(service).toBeTruthy();
  });
});
