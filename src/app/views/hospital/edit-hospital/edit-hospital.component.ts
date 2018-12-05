
declare var require: any;
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IOption } from 'ng-select';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Bank } from '../../common-functions/models/bank.model';
import { BankBranch } from '../../common-functions/models/bankBranch.model';
import { Broker } from '../../common-functions/models/broker.model';
import { BusinessChannel } from '../../common-functions/models/businessChannel.model';
import { ModeOfProposal } from '../../common-functions/models/modeOfProposal.model';
import { MRPUser } from '../../common-functions/models/mrpUser.model';
import { CommonFunctionsService } from '../../common-functions/common-functions.service';
import { EditHospitalService } from './edit-hospital.service';




@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.scss',
    '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../scss/vendors/ng-select/ng-select.scss',
    '../../../../scss/vendors/toastr/toastr.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})




export class EditHospitalComponent implements OnInit {


  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });


  hospitalForm: FormGroup;


  public phoneModel = '';
  public phoneMask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private formBuilder: FormBuilder, private editHospitalService: EditHospitalService,
    toasterService: ToasterService, private route: ActivatedRoute,
    private router: Router) {
    this.toasterService = toasterService;
  }





  ngOnInit() {

    this.initializeForm();


    this.route.params.subscribe(params => {
      this.editHospitalService.getHospitalById(params['seqId']).subscribe(res => {

        this.hospitalForm.setValue({
          SeqId: res.SeqId,
          HospitalCode: res.HospitalCode,
          Name: res.Name,
          Address: res.Address,
          City: res.City,
          TelephoneNo: res.TelephoneNo,
          Fax: res.Fax,
          EMail: res.EMail,
          Remarks: res.Remarks,
          RegisterUserCode: res.RegisterUserCode,
          RegisterDate:res.RegisterDate
        });
      });
    });



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
    this.editHospitalService.updateHospital(this.hospitalForm.value)
      .subscribe(data => {
        this.showToasterMessage('success', 'Notification', 'Hospital successfully updated!');
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
