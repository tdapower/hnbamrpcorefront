import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchWorkflowjobComponent } from './search-workflowjob.component';


const routes: Routes = [
  {
    path: '',
    component: SearchWorkflowjobComponent,
    data: {
      title: 'Search Workflow Job'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchWorkflowjobRoutingModule {}
