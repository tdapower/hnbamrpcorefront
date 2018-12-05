import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Http } from '@angular/http';
import { SearchHospital } from '../models/searchHospital.model';
import { SearchHospitalService } from './search-hospital.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-hospital.component.html',
  styleUrls: ['./search-hospital.component.scss',
    '../../../../scss/vendors/toastr/toastr.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class SearchHospitalComponent implements OnInit {



  searchHospital: SearchHospital;
  searchHospitalForm: FormGroup;

  public data;


  constructor(private http: Http, private searchHospitalService: SearchHospitalService, toasterService: ToasterService,
    private formBuilder: FormBuilder) {

  }

  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 1000
    });



  ngOnInit() {
    this.initializeForm();
  }


  initializeForm() {
    this.searchHospitalForm = this.formBuilder.group({
      HospitalCode: [''],
      Name: [''],
      Address: ['']
    });


  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }

  onSubmit() {
    this.searchHospital = new SearchHospital();
    this.searchHospital.HospitalCode = this.searchHospitalForm.value.HospitalCode;
    this.searchHospital.Name = this.searchHospitalForm.value.Name;
    this.searchHospital.Address = this.searchHospitalForm.value.Address;

    this.searchHospitalService.searchHospital(this.searchHospital)
      .subscribe(
        data => this.data = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Hospital!'));

  }



  showToasterMessage(type, title, message) {
    this.toasterService.pop(type, title, message);
  }


}
