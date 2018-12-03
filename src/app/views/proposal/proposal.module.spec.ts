import { ProposalModule } from './proposal.module';

describe('ProposalModule', () => {
  let proposalModule: ProposalModule;

  beforeEach(() => {
    proposalModule = new ProposalModule();
  });

  it('should create an instance', () => {
    expect(proposalModule).toBeTruthy();
  });
});
