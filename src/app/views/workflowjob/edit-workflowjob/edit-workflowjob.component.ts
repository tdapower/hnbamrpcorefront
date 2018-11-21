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
import { EditWorkflowjobService } from './edit-workflowjob.service';
import { CommonFunctionsService } from '../../common-functions/common-functions.service';
import { WorkflowjobService } from '../workflowjob.service';

@Component({
  selector: 'app-edit-workflowjob',
  templateUrl: './edit-workflowjob.component.html',
  styleUrls: ['./edit-workflowjob.component.scss',
    '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../scss/vendors/ng-select/ng-select.scss',
    '../../../../scss/vendors/toastr/toastr.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class EditWorkflowjobComponent implements OnInit {


  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  workflowJobForm: FormGroup;

  banks: Bank[];
  bankBranches: BankBranch[];
  brokers: Broker[];
  businessChannels: BusinessChannel[];
  modeOfProposals: ModeOfProposal[];
  mRPUsers: MRPUser[];


  constructor(private formBuilder: FormBuilder, private editWorkflowjobService: EditWorkflowjobService,
    private workflowjobService: WorkflowjobService, private commonFunctionsService: CommonFunctionsService,
     toasterService: ToasterService, private route: ActivatedRoute,
     private router: Router) {
    this.toasterService = toasterService;
  }





  ngOnInit() {

    this.initializeForm();

    this.getBanks();
    //this.getBankBranches();
    this.getBrokers();
    this.getBusinessChannels();
    this.getModeOfProposals();
    this.getMRPUsers();
    this.getPendingJobsOfUsers();

    this.onChanges();

    this.route.params.subscribe(params => {
      this.editWorkflowjobService.getWorkflowjobByJobNo(params['jobNo']).subscribe(res => {

        this.workflowJobForm.setValue({
          JobNo: res.JobNo,
          ProposalNo: res.ProposalNo,
          LifeAssure1NIC: res.LifeAssure1NIC,
          LifeAssure2NIC: res.LifeAssure2NIC,
          BankCode: res.BankCode,
          CreatedDate: res.CreatedDate,
          CreatedUserCode: res.CreatedUserCode,
          AssignedUserCode: res.AssignedUserCode,
          ProposalNoUpdatedDate: res.ProposalNoUpdatedDate,
          IsCancelled: res.IsCancelled,
          BrokerCode: res.BrokerCode,
          IsFastTrack: res.IsFastTrack,
          ProposalModeId: res.ProposalModeId,
          WorkflowType: 'MRP',
          BusinessChannelId: res.BusinessChannelId,
          IsFreeCoverLimitProposal: res.IsFreeCoverLimitProposal,
          BankId: res.BankId,
          BankBranchId: res.BankBranchId,

        });
      });
    });



  }

  initializeForm() {
    this.workflowJobForm = this.formBuilder.group({
      JobNo: [''],
      ProposalNo: [''],
      LifeAssure1NIC: [''],
      LifeAssure2NIC: [''],
      BankCode: [''],
      CreatedDate: [''],
      CreatedUserCode: [''],
      AssignedUserCode: [''],
      ProposalNoUpdatedDate: [''],
      IsCancelled: [0],
      BrokerCode: [''],
      IsFastTrack: [0],
      ProposalModeId: [0],
      WorkflowType: ['MRP'],
      BusinessChannelId: [0],
      IsFreeCoverLimitProposal: [0],
      BankId: [0],
      BankBranchId: [0]
    });


  }



  onSubmit() {

    this.workflowJobForm.patchValue(
      {
        IsFastTrack: this.workflowJobForm.value.IsFastTrack == true ? 1 : 0,
        IsFreeCoverLimitProposal: this.workflowJobForm.value.IsFreeCoverLimitProposal == true ? 1 : 0
      });

console.log('this.workflowJobForm.valu   '+ JSON.stringify(this.workflowJobForm.value));


    this.editWorkflowjobService.updateWorkflowJob(this.workflowJobForm.value)
      .subscribe(data => {
        this.showToasterMessage('success', 'Notification', 'Workflow Job successfully updated!');

        this.initializeForm();
        // this.router.navigate(['list-user']);

      }
        ,
        errorCode => {
          this.showToasterMessage('error', 'Notification', 'Error saving Workflow Job!');
        }
      );
  }




  getBanks() {
    this.commonFunctionsService.getBank()
      .subscribe(
        data => this.banks = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Banks!'));
  }
  getBankBranches() {
    this.commonFunctionsService.getBankBranch()
      .subscribe(
        data => this.bankBranches = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Bank Branches!'));
  }

  getBankBranchByBankId(bankId) {
    this.commonFunctionsService.getBankBranchByBankId(bankId)
      .subscribe(
        data => this.bankBranches = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Bank Branches!'));
  }
  getBrokers() {
    this.commonFunctionsService.getBroker()
      .subscribe(
        data => this.brokers = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Brokers!'));
  }
  getBusinessChannels() {
    this.commonFunctionsService.getBusinessChannels()
      .subscribe(
        data => this.businessChannels = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Business Channels!'));
  }

  getModeOfProposals() {
    this.commonFunctionsService.getModeOfProposals()
      .subscribe(
        data => this.modeOfProposals = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Mode of Proposals!'));
  }


  getMRPUsers() {
    this.commonFunctionsService.getMRPUsers()
      .subscribe(
        data => this.mRPUsers = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Users!'));
  }

  getPendingJobsOfUsers() {
    // this.commonFunctionsService.getPendingJobsOfUsers()
    //   .subscribe(
    //     data => {
    //       this.data = data;
    //     },
    //     errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Pending jobs of User!'));
  }


  onChanges(): void {
    this.workflowJobForm.get('BankId').valueChanges.subscribe(val => {
      if (val != 0) {

        this.getBankBranchByBankId(val);
      }
    });

  }



  showToasterMessage(type, title, message) {
    this.toasterService.pop(type, title, message);
  }


}
