import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkflowjobComponent } from './edit-workflowjob.component';

describe('EditWorkflowjobComponent', () => {
  let component: EditWorkflowjobComponent;
  let fixture: ComponentFixture<EditWorkflowjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkflowjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkflowjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
