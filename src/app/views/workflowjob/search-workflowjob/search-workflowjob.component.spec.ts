import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWorkflowjobComponent } from './search-workflowjob.component';

describe('SearchWorkflowjobComponent', () => {
  let component: SearchWorkflowjobComponent;
  let fixture: ComponentFixture<SearchWorkflowjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWorkflowjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWorkflowjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
