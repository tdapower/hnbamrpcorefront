import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AddCustomerComponent } from './add-customer.component';
import { CustomerModule } from '../customer.module';
import { AddCustomerRoutingModule } from './add-customer-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
    AddCustomerRoutingModule,
    BsDropdownModule.forRoot(),
    CustomerModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectModule,
    TextMaskModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule
  ],
  declarations: [
    AddCustomerComponent
  ]
})
export class AddCustomerModule { }
