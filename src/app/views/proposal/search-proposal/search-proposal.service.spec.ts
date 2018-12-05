import { TestBed } from '@angular/core/testing';

import { SearchProposalService } from './search-proposal.service';

describe('SearchProposalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchProposalService = TestBed.get(SearchProposalService);
    expect(service).toBeTruthy();
  });
});
