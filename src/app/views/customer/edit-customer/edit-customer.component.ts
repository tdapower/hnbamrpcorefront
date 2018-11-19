declare var require: any;
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IOption } from 'ng-select';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Customer } from '../models/customer.model';
import { CustomerService } from './../customer.service';
import { Nationality } from '../models/nationality.model';
import { NICExtractedData } from '../models/nICExtractedData.model';
import { EditCustomerService } from './edit-customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss',
    '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../scss/vendors/ng-select/ng-select.scss',
    '../../../../scss/vendors/toastr/toastr.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class EditCustomerComponent implements OnInit {


  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();


  editCustomerForm: FormGroup;



  nationalities: Nationality[];

  NICExtractedData: NICExtractedData = null;

  bmiClass: string;
  bmiResult: string;



  constructor(private formBuilder: FormBuilder, private editCustomerService: EditCustomerService,
    private customerService: CustomerService, toasterService: ToasterService, private route: ActivatedRoute,
    private router: Router) {
    this.toasterService = toasterService;
    this.dpConfig.containerClass = 'theme-red';

    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
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

    this.route.params.subscribe(params => {
      this.editCustomerService.getCustomerById(params['id']).subscribe(res => {

        this.editCustomerForm.setValue({
          SeqId: res.SeqId,
          AssureType: res.AssureType,
          Name: res.Name,
          DOB: res.DOB.substr(0, 10),
          Age: res.Age,
          Gender: res.Gender,
          NIC: res.NIC,
          NationalityId: res.NationalityId,
          Occupation: res.Occupation,
          ContactNo: res.ContactNo,
          Email: res.Email,
          Address: res.Address,
          HeightCm: res.HeightCm,
          HeightInch: res.HeightInch,
          WeightKg: res.WeightKg,
          WeightLbs: res.WeightLbs,
          BMI: res.BMI,
          PreviousPolicyAmount: res.PreviousPolicyAmount,
          IsAgeAdmitted: res.IsAgeAdmitted,
          IsSmoker: res.IsSmoker,
          IsFemaleRebate: res.IsFemaleRebate,
          IsVIP: res.IsVIP,
          RegisterDate: res.RegisterDate,


        });
      });
    });



  }

  initializeForm() {
    this.editCustomerForm = this.formBuilder.group({
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

    this.editCustomerForm.patchValue(
      {
        DOB: this.editCustomerForm.value.DOB,
        IsAgeAdmitted: this.editCustomerForm.value.IsAgeAdmitted == true ? 1 : 0,
        IsSmoker: this.editCustomerForm.value.IsSmoker == true ? 1 : 0,
        IsFemaleRebate: this.editCustomerForm.value.IsFemaleRebate == true ? 1 : 0,
        IsVIP: this.editCustomerForm.value.IsVIP == true ? 1 : 0
      });



    this.editCustomerService.updateCustomer(this.editCustomerForm.value)
      .subscribe(data => {
        this.showToasterMessage('success', 'Notification', 'Customer successfully updated!');

        this.initializeForm();
        // this.router.navigate(['list-user']);

      }
        ,
        errorCode => {
          this.showToasterMessage('error', 'Notification', 'Error saving customer!');
        }
      );
  }

  getNationalities() {
    this.customerService.getNationality()
      .subscribe(
        data => this.nationalities = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Nationalities!'));
  }

  CalculateBMI(parameter) {
    try {


      if (parameter == "HeightCm") {
        if (this.editCustomerForm.value.HeightCm != 0) {
          this.editCustomerForm.patchValue({
            HeightInch: Number((this.editCustomerForm.value.HeightCm / 2.54).toFixed(2))
          });
        }
      }
      ;
      if (parameter == "WeightKg") {
        if (this.editCustomerForm.value.WeightKg != 0) {
          this.editCustomerForm.patchValue({
            WeightLbs: Number((this.editCustomerForm.value.WeightKg * 2.20462).toFixed(2))
          });
        }
      }


      if (parameter == "HeightInch") {
        if (this.editCustomerForm.value.HeightInch != 0) {
          this.editCustomerForm.patchValue({
            HeightCm: Number((this.editCustomerForm.value.HeightInch * 2.54).toFixed(2))
          });
        }
      }

      if (parameter == "WeightLbs") {
        if (this.editCustomerForm.value.WeightLbs != 0) {
          this.editCustomerForm.patchValue({
            WeightKg: Number((this.editCustomerForm.value.WeightLbs * 0.453592).toFixed(2))
          });
        }
      }

      if (this.editCustomerForm.value.HeightCm != 0 && this.editCustomerForm.value.WeightKg != 0) {

        let calculatedBMI = this.customerService.calculateBMI(this.editCustomerForm.value.HeightCm, this.editCustomerForm.value.WeightKg);



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


        this.editCustomerForm.patchValue({
          BMI: calculatedBMI
        });


      }

    } catch (e) {

    }
  }

  public ExtractDataFromNIC() {
    if (this.editCustomerForm.value.NIC != "") {

      try {
        this.NICExtractedData = this.customerService.extractDataFromNIC(this.editCustomerForm.value.NIC);
        var moment = require('moment');

        if (this.NICExtractedData.DOB != null) {

          var momentDateLifeDob = moment(this.NICExtractedData.DOB.substr(0, 10), 'DD/MM/YYYY').toDate();

          console.log('momentDateLifeDob   = ' + momentDateLifeDob);

          this.editCustomerForm.patchValue({
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
    this.editCustomerForm.patchValue({
      Age: Math.round(this.customerService.calculateAge(this.editCustomerForm.value.DOB, moment()))
    });

  }


  showToasterMessage(type, title, message) {
    this.toasterService.pop(type, title, message);
  }


}
