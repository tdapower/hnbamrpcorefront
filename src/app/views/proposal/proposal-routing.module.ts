import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Proposal'
    },
    children: [
      {
        path: 'search-proposal',
        loadChildren: './search-proposal/search-proposal.module#SearchProposalModule'
      },
      {
        path: 'update-proposal',
        loadChildren: './update-proposal/update-proposal.module#UpdateProposalModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalRoutingModule { }

