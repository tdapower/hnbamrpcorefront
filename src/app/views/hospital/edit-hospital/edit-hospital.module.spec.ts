import { EditHospitalModule } from './edit-hospital.module';

describe('EditHospitalModule', () => {
  let editHospitalModule: EditHospitalModule;

  beforeEach(() => {
    editHospitalModule = new EditHospitalModule();
  });

  it('should create an instance', () => {
    expect(editHospitalModule).toBeTruthy();
  });
});
