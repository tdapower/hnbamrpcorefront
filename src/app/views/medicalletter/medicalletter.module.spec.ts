import { MedicalletterModule } from './medicalletter.module';

describe('MedicalletterModule', () => {
  let medicalletterModule: MedicalletterModule;

  beforeEach(() => {
    medicalletterModule = new MedicalletterModule();
  });

  it('should create an instance', () => {
    expect(medicalletterModule).toBeTruthy();
  });
});
