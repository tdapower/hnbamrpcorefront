import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchProposalComponent } from './search-proposal.component';


const routes: Routes = [
  {
    path: '',
    component: SearchProposalComponent,
    data: {
      title: 'Search Proposal'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearcProposalRoutingModule {}
