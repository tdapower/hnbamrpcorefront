declare var require: any;
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Bank } from '../../common-functions/models/bank.model';
import { BankBranch } from '../../common-functions/models/bankBranch.model';
import { Broker } from '../../common-functions/models/broker.model';
import { BusinessChannel } from '../../common-functions/models/businessChannel.model';
import { CommonFunctionsService } from '../../common-functions/common-functions.service';
import { WorkflowjobService } from '../workflowjob.service';
import { AddWorkflowjobService } from './add-workflowjob.service';
import { ModeOfProposal } from '../../common-functions/models/modeOfProposal.model';
import { MRPUser } from '../../common-functions/models/mrpUser.model';
import { User } from '../../common-functions/models/user.model';
import { UserPendingJob } from '../../common-functions/models/userPendingJob.model';

@Component({
  selector: 'app-add-workflowjob',
  templateUrl: './add-workflowjob.component.html',
  styleUrls: ['./add-workflowjob.component.scss',
    '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../scss/vendors/ng-select/ng-select.scss',
    '../../../../scss/vendors/toastr/toastr.scss'],

  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class AddWorkflowjobComponent implements OnInit {

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



  User: User;

  workflowJobForm: FormGroup;


  banks: Bank[];
  bankBranches: BankBranch[];
  brokers: Broker[];
  businessChannels: BusinessChannel[];
  modeOfProposals: ModeOfProposal[];
  mRPUsers:MRPUser[];

  public data;



  constructor(private formBuilder: FormBuilder, private addWorkflowjobService: AddWorkflowjobService,
    private workflowjobService: WorkflowjobService, private commonFunctionsService: CommonFunctionsService, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {

    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));


    this.initializeForm();

    this.getBanks();
    //this.getBankBranches();
    this.getBrokers();
    this.getBusinessChannels();
    this.getModeOfProposals();
    this.getMRPUsers();
    this.getPendingJobsOfUsers();

    this.onChanges();
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
    this.commonFunctionsService.getPendingJobsOfUsers()
      .subscribe(
        data =>{          
          this.data = data;
        },
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Pending jobs of User!'));
  }


  onChanges(): void {
    this.workflowJobForm.get('BankId').valueChanges.subscribe(val => {
      if (val != 0) {

        this.getBankBranchByBankId(val);
      }
    });

  }



  onSubmit() {

    this.workflowJobForm.patchValue(
      {
        CreatedUserCode:this.User.UserName,
        IsFastTrack: this.workflowJobForm.value.IsFastTrack == true ? 1 : 0,
        IsFreeCoverLimitProposal: this.workflowJobForm.value.IsFreeCoverLimitProposal == true ? 1 : 0
      });



    this.addWorkflowjobService.createWorkflowJob(this.workflowJobForm.value)
      .subscribe(data => {
        console.log(data);
        
        this.showToasterMessage('success', 'Notification', 'Workflow Job successfully saved!');

        this.initializeForm();
      }
      ,
        errorCode => {
          this.showToasterMessage('error', 'Notification', 'Error saving workflow job!');
        }
        
        );
  }







  showToasterMessage(type, title, message) {
    this.toasterService.pop(type, title, message);
  }




}
