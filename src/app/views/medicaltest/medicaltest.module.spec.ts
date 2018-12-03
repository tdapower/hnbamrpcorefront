import { MedicaltestModule } from './medicaltest.module';

describe('MedicaltestModule', () => {
  let medicaltestModule: MedicaltestModule;

  beforeEach(() => {
    medicaltestModule = new MedicaltestModule();
  });

  it('should create an instance', () => {
    expect(medicaltestModule).toBeTruthy();
  });
});
