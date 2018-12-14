import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { EditWorkflowjobComponent } from './edit-workflowjob.component';
import { EditWorkflowjobRoutingModule } from './edit-workflowjob-routing.module';
import { WorkflowjobModule } from '../workflowjob.module';
import { DataTableModule } from 'angular2-datatable';

@NgModule({
  imports: [
    EditWorkflowjobRoutingModule,
    BsDropdownModule.forRoot(),
    WorkflowjobModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectModule,
    TextMaskModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    ModalModule.forRoot(),
    DataTableModule
  ],
  declarations: [EditWorkflowjobComponent]
})
export class EditWorkflowjobModule { }
