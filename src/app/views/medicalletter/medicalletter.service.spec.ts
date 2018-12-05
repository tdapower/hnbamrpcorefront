import { TestBed } from '@angular/core/testing';

import { MedicalletterService } from './medicalletter.service';

describe('MedicalletterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicalletterService = TestBed.get(MedicalletterService);
    expect(service).toBeTruthy();
  });
});
