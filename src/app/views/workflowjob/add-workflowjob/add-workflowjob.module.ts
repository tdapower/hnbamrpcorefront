import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { AddWorkflowjobRoutingModule } from './add-workflowjob-routing.module';
import { WorkflowjobModule } from '../workflowjob.module';
import { AddWorkflowjobComponent } from './add-workflowjob.component';
import { DataTableModule } from 'angular2-datatable';

@NgModule({
  imports: [
    AddWorkflowjobRoutingModule,
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
    DataTableModule
  ],
  declarations: [AddWorkflowjobComponent]
})
export class AddWorkflowjobModule { }
