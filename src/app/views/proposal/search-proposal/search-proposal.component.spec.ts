import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProposalComponent } from './search-proposal.component';

describe('SearchProposalComponent', () => {
  let component: SearchProposalComponent;
  let fixture: ComponentFixture<SearchProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
