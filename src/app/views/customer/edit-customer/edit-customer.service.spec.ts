import { TestBed } from '@angular/core/testing';

import { EditCustomerService } from './edit-customer.service';

describe('EditCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditCustomerService = TestBed.get(EditCustomerService);
    expect(service).toBeTruthy();
  });
});
