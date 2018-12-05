import { TestBed } from '@angular/core/testing';

import { AddWorkflowjobService } from './add-workflowjob.service';

describe('AddWorkflowjobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddWorkflowjobService = TestBed.get(AddWorkflowjobService);
    expect(service).toBeTruthy();
  });
});
