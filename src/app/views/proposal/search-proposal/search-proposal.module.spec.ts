import { SearchProposalModule } from './search-proposal.module';

describe('SearchProposalModule', () => {
  let searchProposalModule: SearchProposalModule;

  beforeEach(() => {
    searchProposalModule = new SearchProposalModule();
  });

  it('should create an instance', () => {
    expect(searchProposalModule).toBeTruthy();
  });
});
