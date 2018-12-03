import { TestBed } from '@angular/core/testing';

import { GenerateMedicalletterService } from './generate-medicalletter.service';

describe('GenerateMedicalletterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateMedicalletterService = TestBed.get(GenerateMedicalletterService);
    expect(service).toBeTruthy();
  });
});
