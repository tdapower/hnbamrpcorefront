import { GenerateMedicalletterModule } from './generate-medicalletter.module';

describe('GenerateMedicalletterModule', () => {
  let generateMedicalletterModule: GenerateMedicalletterModule;

  beforeEach(() => {
    generateMedicalletterModule = new GenerateMedicalletterModule();
  });

  it('should create an instance', () => {
    expect(generateMedicalletterModule).toBeTruthy();
  });
});
