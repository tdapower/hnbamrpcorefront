import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { AddHospitalRoutingModule } from './add-hospital-routing.module';
import { HospitalModule } from '../hospital.module';
import { AddHospitalComponent } from './add-hospital.component';



@NgModule({
  imports: [
    AddHospitalRoutingModule,
    BsDropdownModule.forRoot(),
    HospitalModule,
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
    AddHospitalComponent
  ]
})
export class AddHospitalModule { }
