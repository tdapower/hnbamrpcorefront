import { TestBed } from '@angular/core/testing';

import { SearchWorkflowjobService } from './search-workflowjob.service';

describe('SearchWorkflowjobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchWorkflowjobService = TestBed.get(SearchWorkflowjobService);
    expect(service).toBeTruthy();
  });
});
