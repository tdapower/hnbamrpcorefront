import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkflowjobComponent } from './add-workflowjob.component';

describe('AddWorkflowjobComponent', () => {
  let component: AddWorkflowjobComponent;
  let fixture: ComponentFixture<AddWorkflowjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkflowjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkflowjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
