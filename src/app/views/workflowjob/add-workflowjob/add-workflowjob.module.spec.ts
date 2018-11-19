import { AddWorkflowjobModule } from './add-workflowjob.module';

describe('AddWorkflowjobModule', () => {
  let addWorkflowjobModule: AddWorkflowjobModule;

  beforeEach(() => {
    addWorkflowjobModule = new AddWorkflowjobModule();
  });

  it('should create an instance', () => {
    expect(addWorkflowjobModule).toBeTruthy();
  });
});
