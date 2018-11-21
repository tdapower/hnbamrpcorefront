import { SearchHospitalModule } from './search-hospital.module';

describe('SearchHospitalModule', () => {
  let searchHospitalModule: SearchHospitalModule;

  beforeEach(() => {
    searchHospitalModule = new SearchHospitalModule();
  });

  it('should create an instance', () => {
    expect(searchHospitalModule).toBeTruthy();
  });
});
