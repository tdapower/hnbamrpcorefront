import { TestBed } from '@angular/core/testing';

import { WorkflowjobService } from './workflowjob.service';

describe('WorkflowjobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowjobService = TestBed.get(WorkflowjobService);
    expect(service).toBeTruthy();
  });
});
