import { EditWorkflowjobModule } from './edit-workflowjob.module';

describe('EditWorkflowjobModule', () => {
  let editWorkflowjobModule: EditWorkflowjobModule;

  beforeEach(() => {
    editWorkflowjobModule = new EditWorkflowjobModule();
  });

  it('should create an instance', () => {
    expect(editWorkflowjobModule).toBeTruthy();
  });
});
