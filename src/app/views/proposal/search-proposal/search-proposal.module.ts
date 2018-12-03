import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SelectModule } from 'ng-select';

import { DataTableModule } from 'angular2-datatable';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { HttpModule } from '@angular/http';
import { SearchProposalComponent } from './search-proposal.component';
import { SearcProposalRoutingModule } from './search-proposal-routing.module';
import { ProposalModule } from '../proposal.module';

@NgModule({
  imports: [
    
    SearcProposalRoutingModule,
    ProposalModule,
    CollapseModule.forRoot(),
    SelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    DataTableModule,
    HttpModule
  ],
  declarations: [SearchProposalComponent]
})
export class SearchProposalModule { }
