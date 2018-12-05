import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Customer } from '../models/customer.model';
import { SearchCustomer } from '../models/searchCustomer.model';
import { SearchCustomerService } from './search-customer.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss',
    '../../../../scss/vendors/toastr/toastr.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class SearchCustomerComponent implements OnInit {

  searchCustomer: SearchCustomer;
  searchCustomerForm: FormGroup;

  public data;

  constructor(private http: Http, private searchCustomerService: SearchCustomerService, toasterService: ToasterService,
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
    this.searchCustomerForm = this.formBuilder.group({
      Name: [''],
      NIC: [''],
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
    this.searchCustomer = new SearchCustomer();
    this.searchCustomer.Name = this.searchCustomerForm.value.Name;
    this.searchCustomer.NIC = this.searchCustomerForm.value.NIC;
    this.searchCustomer.Address = this.searchCustomerForm.value.Address;

    this.searchCustomerService.searchCustomers(this.searchCustomer)
      .subscribe(
        data => this.data = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Customers!'));

  }





  showToasterMessage(type, title, message) {
    this.toasterService.pop(type, title, message);
  }


}
