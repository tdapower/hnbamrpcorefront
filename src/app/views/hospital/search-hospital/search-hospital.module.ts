import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SelectModule } from 'ng-select';

import { DataTableModule } from 'angular2-datatable';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { HttpModule } from '@angular/http';
import { SearchHospitalRoutingModule } from './search-hospital-routing.module';
import { HospitalModule } from '../hospital.module';
import { SearchHospitalComponent } from './search-hospital.component';

@NgModule({
  imports: [
    SearchHospitalRoutingModule,
    HospitalModule,
    CollapseModule.forRoot(),
    SelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    DataTableModule,
    HttpModule
  ],
  declarations: [SearchHospitalComponent]
})
export class SearchHospitalModule { }
