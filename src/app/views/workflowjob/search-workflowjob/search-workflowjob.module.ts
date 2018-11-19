import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SelectModule } from 'ng-select';

import { DataTableModule } from 'angular2-datatable';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { HttpModule } from '@angular/http';
import { SearchWorkflowjobComponent } from './search-workflowjob.component';
import { SearchWorkflowjobRoutingModule } from './search-workflowjob-routing.module';
import { WorkflowjobModule } from '../workflowjob.module';

@NgModule({
  imports: [
    SearchWorkflowjobRoutingModule,
    WorkflowjobModule,
    CollapseModule.forRoot(),
    SelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    DataTableModule,
    HttpModule
  ],
  declarations: [
    SearchWorkflowjobComponent
  ]
})
export class SearchWorkflowjobModule { }
