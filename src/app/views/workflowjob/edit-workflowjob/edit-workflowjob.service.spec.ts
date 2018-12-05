import { TestBed } from '@angular/core/testing';

import { EditWorkflowjobService } from './edit-workflowjob.service';

describe('EditWorkflowjobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditWorkflowjobService = TestBed.get(EditWorkflowjobService);
    expect(service).toBeTruthy();
  });
});
