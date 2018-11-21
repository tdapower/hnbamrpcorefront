import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { HospitalModule } from '../hospital.module';
import { EditHospitalRoutingModule } from './edit-hospital-routing.module';
import { EditHospitalComponent } from './edit-hospital.component';



@NgModule({
  imports: [
    EditHospitalRoutingModule,
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
    EditHospitalComponent
  ]
})
export class EditHospitalModule { }
