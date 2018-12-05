import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Workflow Job'
    },
    children: [
      {
        path: 'add-workflowjob',
        loadChildren: './add-workflowjob/add-workflowjob.module#AddWorkflowjobModule'
      },
      {
        path: 'edit-workflowjob/:jobNo',
        loadChildren: './edit-workflowjob/edit-workflowjob.module#EditWorkflowjobModule'
      },
      {
        path: 'search-workflowjob',
        loadChildren: './search-workflowjob/search-workflowjob.module#SearchWorkflowjobModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowjobRoutingModule {}
