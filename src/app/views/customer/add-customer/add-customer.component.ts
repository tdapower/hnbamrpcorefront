declare var require: any;
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IOption } from 'ng-select';

import { Customer } from '../models/customer.model';
import { AddCustomerService } from './add-customer.service';
import { CustomerService } from './../customer.service';
import { Nationality } from '../models/nationality.model';
import { NICExtractedData } from '../models/nICExtractedData.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss',
    '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../scss/vendors/ng-select/ng-select.scss',
    '../../../../scss/vendors/toastr/toastr.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class AddCustomerComponent implements OnInit {

  public largeModal;

  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  addCustomerForm: FormGroup;


  nationalities: Nationality[];

  NICExtractedData: NICExtractedData = null;

   
  bmiClass: string;
  bmiResult: string;



  constructor(private formBuilder: FormBuilder, private addCustomerService: AddCustomerService,
    private customerService: CustomerService, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  // Datepicker

  minDate = new Date(1900, 1, 1);
  maxDate = new Date(2018, 9, 15);

  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];

  public phoneModel = '';
  public phoneMask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  ngOnInit() {

    this.initializeForm();

    this.getNationalities();

    // this.onChanges();
  }

  initializeForm() {
    this.addCustomerForm = this.formBuilder.group({
      SeqId: [0],
      AssureType: [''],
      Name: ['', Validators.required],
      DOB: ['01/01/1990'],
      Age: [0],
      Gender: [''],
      NIC: ['', [Validators.required, Validators.maxLength(15)]],
      NationalityId: [0],
      Occupation: [''],
      ContactNo: [''],
      Email: [''],
      Address: [''],
      HeightCm: [0],
      HeightInch: [0],
      WeightKg: [0],
      WeightLbs: [0],
      BMI: [0],
      PreviousPolicyAmount: [0],
      IsAgeAdmitted: [0],
      IsSmoker: [0],
      IsFemaleRebate: [0],
      IsVIP: [0],
      RegisterDate: ['']
    });


  }





  onSubmit() {


    var moment = require('moment');
    var formattedDob = moment(this.addCustomerForm.value.DOB).format('DD/MM/YYYY');

    this.addCustomerForm.patchValue(
      {
        DOB: formattedDob,
        IsAgeAdmitted: this.addCustomerForm.value.IsAgeAdmitted == true ? 1 : 0,
        IsSmoker: this.addCustomerForm.value.IsSmoker == true ? 1 : 0,
        IsFemaleRebate: this.addCustomerForm.value.IsFemaleRebate == true ? 1 : 0,
        IsVIP: this.addCustomerForm.value.IsVIP == true ? 1 : 0
      });



    this.addCustomerService.createCustomer(this.addCustomerForm.value)
      .subscribe(data => {
        this.showToasterMessage('success', 'Notification', 'Customer successfully saved!');

        this.initializeForm();
        // this.router.navigate(['list-user']);
      });
  }


  // onChanges(): void {
  //   this.addCustomerForm.get('HeightCm').valueChanges.subscribe(val => {
  //     if (val != 0) {
  //       try {
  //         this.addCustomerForm.patchValue({
  //           HeightInch: Number((val / 2.54).toFixed(2))
  //         });
  //       } catch (e) {
  //       }

  //       if (this.addCustomerForm.value.WeightKg != 0) {
  //         this.addCustomerForm.patchValue({
  //           BMI: this.customerService.calculateBMI(val, this.addCustomerForm.value.WeightKg)
  //         });
  //       }
  //     }
  //   });

  //   this.addCustomerForm.get('WeightKg').valueChanges.subscribe(val => {
  //     if (val != 0) {
  //       this.addCustomerForm.patchValue({
  //         WeightLbs: Number((val * 2.20462).toFixed(2))
  //       });
  //       if (this.addCustomerForm.value.HeightCm != 0) {
  //         this.addCustomerForm.patchValue({
  //           BMI: this.customerService.calculateBMI(this.addCustomerForm.value.HeightCm, val)
  //         });
  //       }
  //     }
  //   });




  //   //  14 - 9.50am
  //   //hr - Nichloa

  // }

  CalculateBMI(parameter) {
    try {


      if (parameter == "HeightCm") {
        if (this.addCustomerForm.value.HeightCm != 0) {
          this.addCustomerForm.patchValue({
            HeightInch: Number((this.addCustomerForm.value.HeightCm / 2.54).toFixed(2))
          });
        }
      }
      ;
      if (parameter == "WeightKg") {
        if (this.addCustomerForm.value.WeightKg != 0) {
          this.addCustomerForm.patchValue({
            WeightLbs: Number((this.addCustomerForm.value.WeightKg * 2.20462).toFixed(2))
          });
        }
      }


      if (parameter == "HeightInch") {
        if (this.addCustomerForm.value.HeightInch != 0) {
          this.addCustomerForm.patchValue({
            HeightCm: Number((this.addCustomerForm.value.HeightInch * 2.54).toFixed(2))
          });
        }
      }

      if (parameter == "WeightLbs") {
        if (this.addCustomerForm.value.WeightLbs != 0) {
          this.addCustomerForm.patchValue({
            WeightKg: Number((this.addCustomerForm.value.WeightLbs * 0.453592).toFixed(2))
          });
        }
      }

      if (this.addCustomerForm.value.HeightCm != 0 && this.addCustomerForm.value.WeightKg != 0) {

        let calculatedBMI = this.customerService.calculateBMI(this.addCustomerForm.value.HeightCm, this.addCustomerForm.value.WeightKg);



        if (calculatedBMI > 0) {
          if (calculatedBMI <= 18) {
            this.bmiClass = "badge badge-danger";
            this.bmiResult = "Under Weight";
          } else if (calculatedBMI > 18 && calculatedBMI <= 30) {
            this.bmiClass = "badge badge-success";
            this.bmiResult = "STD";
          } else if (calculatedBMI > 30) {
            this.bmiClass = "badge badge-danger";
            this.bmiResult = "Over Weight";
          }
        }


        this.addCustomerForm.patchValue({
          BMI: calculatedBMI
        });

       
      }

    } catch (e) {

    }
  }


  getNationalities() {
    this.customerService.getNationality()
      .subscribe(
        data => this.nationalities = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Nationalities!'));
  }

  public ExtractDataFromNIC() {
    if (this.addCustomerForm.value.NIC != "") {

      try {
        this.NICExtractedData = this.customerService.extractDataFromNIC(this.addCustomerForm.value.NIC);
        var moment = require('moment');

        if (this.NICExtractedData.DOB != null) {

          var momentDateLifeDob = moment(this.NICExtractedData.DOB.substr(0, 10), 'DD/MM/YYYY').toDate();

          console.log('momentDateLifeDob   = ' + momentDateLifeDob);

          this.addCustomerForm.patchValue({
            DOB: momentDateLifeDob,
            Gender: this.NICExtractedData.Gender,
            Age: Math.round(this.customerService.calculateAge(momentDateLifeDob, moment()))

          });

        }
      } catch (err) {
        console.log(err);
      }
    }
  }


  public calculatAge() {
    var moment = require('moment');
    this.addCustomerForm.patchValue({
      Age: Math.round(this.customerService.calculateAge(this.addCustomerForm.value.DOB, moment()))
    });

  }






  showToasterMessage(type, title, message) {
    this.toasterService.pop(type, title, message);
  }



}
