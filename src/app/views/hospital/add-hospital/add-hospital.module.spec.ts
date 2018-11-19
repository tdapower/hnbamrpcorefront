import { AddHospitalModule } from './add-hospital.module';

describe('AddHospitalModule', () => {
  let addHospitalModule: AddHospitalModule;

  beforeEach(() => {
    addHospitalModule = new AddHospitalModule();
  });

  it('should create an instance', () => {
    expect(addHospitalModule).toBeTruthy();
  });
});
