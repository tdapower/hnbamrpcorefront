import { WorkflowjobModule } from './workflowjob.module';

describe('WorkflowjobModule', () => {
  let workflowjobModule: WorkflowjobModule;

  beforeEach(() => {
    workflowjobModule = new WorkflowjobModule();
  });

  it('should create an instance', () => {
    expect(workflowjobModule).toBeTruthy();
  });
});
