import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalComponent } from './proposal.component';
import { ProposalRoutingModule } from './proposal-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProposalRoutingModule
  ],
  declarations: [ProposalComponent]
})
export class ProposalModule { }
