import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditWorkflowjobComponent } from './edit-workflowjob.component';


const routes: Routes = [
  {
    path: '',
    component: EditWorkflowjobComponent,
    data: {
      title: 'Edit Workflow Job'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditWorkflowjobRoutingModule {}
