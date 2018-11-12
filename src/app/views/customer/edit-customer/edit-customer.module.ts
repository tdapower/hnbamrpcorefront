import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular 2 Input Mask
import { TextMaskModule } from 'angular2-text-mask';

// Timepicker
import { TimepickerModule } from 'ngx-bootstrap';

// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap';

// Ng2-select
import { SelectModule } from 'ng-select';

// Routing

import { CustomerModule } from '../customer.module';
import { EditCustomerComponent } from './edit-customer.component';
import { EditCustomerRoutingModule } from './edit-customer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CustomerModule,
    EditCustomerRoutingModule,
    TextMaskModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectModule
  ],
  declarations: [
    EditCustomerComponent
  ]
})
export class EditCustomerModule { }
