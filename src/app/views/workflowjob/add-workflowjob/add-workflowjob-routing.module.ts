import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWorkflowjobComponent } from './add-workflowjob.component';


const routes: Routes = [
  {
    path: '',
    component: AddWorkflowjobComponent,
    data: {
      title: 'Add Workflow Job'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddWorkflowjobRoutingModule {}
