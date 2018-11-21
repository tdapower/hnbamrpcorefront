declare var require: any;
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IOption } from 'ng-select';
import { User } from '../../common-functions/models/user.model';
import { AddHospitalService } from './add-hospital.service';


@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss',
    '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../scss/vendors/ng-select/ng-select.scss',
    '../../../../scss/vendors/toastr/toastr.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class AddHospitalComponent implements OnInit {


  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  // Datepicker
  minDate = new Date(1900, 1, 1);
  maxDate = new Date(2018, 9, 15);
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];


  public phoneModel = '';
  public phoneMask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  User: User;

  hospitalForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private addHospitalService: AddHospitalService,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {

    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));


    this.initializeForm();

  }

  initializeForm() {
    this.hospitalForm = this.formBuilder.group({
      SeqId: [0],
      HospitalCode: [''],
      Name: [''],
      Address: [''],
      City: [''],
      TelephoneNo: [''],
      Fax: [''],
      EMail: [''],
      Remarks: [''],
      RegisterUserCode: [''],
      RegisterDate: ['']
    });
  }


  onSubmit() {

    this.hospitalForm.patchValue(
      {
        RegisterUserCode: this.User.UserName
      });


    this.addHospitalService.addHospital(this.hospitalForm.value)
      .subscribe(data => {
        console.log(data);

        this.showToasterMessage('success', 'Notification', 'Hospital successfully saved!');

        this.initializeForm();
      }
        ,
        errorCode => {
          this.showToasterMessage('error', 'Notification', 'Error saving Hospital!');
        }

      );
  }



  showToasterMessage(type, title, message) {
    this.toasterService.pop(type, title, message);
  }




}
