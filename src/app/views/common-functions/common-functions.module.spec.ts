import { CommonFunctionsModule } from './common-functions.module';

describe('CommonFunctionsModule', () => {
  let commonFunctionsModule: CommonFunctionsModule;

  beforeEach(() => {
    commonFunctionsModule = new CommonFunctionsModule();
  });

  it('should create an instance', () => {
    expect(commonFunctionsModule).toBeTruthy();
  });
});
