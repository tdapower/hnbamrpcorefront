import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CustomerModule } from '../customer.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';

import { DataTableModule } from 'angular2-datatable';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { SearchCustomerComponent } from './search-customer.component';
import { SearchCustomerRoutingModule } from './search-customer-routing.module';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    SearchCustomerRoutingModule,
    CustomerModule,
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
    SearchCustomerComponent
  ]
})
export class SearchCustomerModule { }
