import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { DataTableModule } from 'angular2-datatable';
import { GenerateMedicalletterRoutingModule } from './generate-medicalletter-routing.module';
import { MedicalletterModule } from '../medicalletter.module';
import { GenerateMedicalletterComponent } from './generate-medicalletter.component';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    GenerateMedicalletterRoutingModule,
    BsDropdownModule.forRoot(),
    MedicalletterModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectModule,
    TextMaskModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    DataTableModule,
    ModalModule.forRoot(),
    LaddaModule
  ],
  declarations: [GenerateMedicalletterComponent]
})
export class GenerateMedicalletterModule { }
