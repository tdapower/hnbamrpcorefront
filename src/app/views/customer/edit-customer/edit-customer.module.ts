import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CustomerModule } from '../customer.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { EditCustomerRoutingModule } from './edit-customer-routing.module';
import { EditCustomerComponent } from './edit-customer.component';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    EditCustomerRoutingModule,
    BsDropdownModule.forRoot(),
    CustomerModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectModule,
    TextMaskModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    LaddaModule
  ],
  declarations: [
    EditCustomerComponent
  ]
})
export class EditCustomerModule { }
