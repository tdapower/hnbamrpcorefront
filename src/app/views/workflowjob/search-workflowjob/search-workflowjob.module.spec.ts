import { SearchWorkflowjobModule } from './search-workflowjob.module';

describe('SearchWorkflowjobModule', () => {
  let searchWorkflowjobModule: SearchWorkflowjobModule;

  beforeEach(() => {
    searchWorkflowjobModule = new SearchWorkflowjobModule();
  });

  it('should create an instance', () => {
    expect(searchWorkflowjobModule).toBeTruthy();
  });
});
