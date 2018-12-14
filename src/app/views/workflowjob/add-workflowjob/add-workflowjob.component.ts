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

import { SearchProposal } from '../../proposal/models/searchProposal.model';
import { SearchProposalService } from '../../proposal/search-proposal/search-proposal.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HnbaBranch } from '../../common-functions/models/hnbaBranch.model';
import { LoanType } from '../../common-functions/models/loanType.model';

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



  public successModal;
  User: User;

  workflowJobForm: FormGroup;

  createdJobNumber: string = '';
  banks: Bank[];
  bankBranches: BankBranch[];
  brokers: Broker[];
  businessChannels: BusinessChannel[];
  modeOfProposals: ModeOfProposal[];
  mRPUsers: MRPUser[];
  hnbaBranches: HnbaBranch[];
  loanTypes: LoanType[];

  public data;

  searchProposal: SearchProposal;
  searchProposalForm: FormGroup;

  public proposaldata;

  constructor(private formBuilder: FormBuilder, private addWorkflowjobService: AddWorkflowjobService,
    private workflowjobService: WorkflowjobService, private commonFunctionsService: CommonFunctionsService, toasterService: ToasterService
    , private searchProposalService: SearchProposalService) {
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

    this.getHnbaBranches();
    this.getLoanTypes();
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

    this.searchProposalForm = this.formBuilder.group({
      QuotationNo: [''],
      ProposalNo: [''],
      BankId: [0],
      HnbaBranchCode: [''],
      LoanTypeId: [0],
      Life1NIC: [''],
      Life1Name: [''],
      Life2NIC: [''],
      Life2Name: ['']
    });

  }



  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
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
        data => {
          this.data = data;
        },
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Pending jobs of User!'));
  }


  getHnbaBranches() {
    this.commonFunctionsService.getHnbaBranch()
      .subscribe(
        data => this.hnbaBranches = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading HNBA Branches!'));
  }

  getLoanTypes() {
    this.commonFunctionsService.getLoanType()
      .subscribe(
        data => this.loanTypes = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Loan Types!'));
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
        CreatedUserCode: this.User.UserName,
        IsFastTrack: this.workflowJobForm.value.IsFastTrack == true ? 1 : 0,
        IsFreeCoverLimitProposal: this.workflowJobForm.value.IsFreeCoverLimitProposal == true ? 1 : 0
      });



    this.addWorkflowjobService.createWorkflowJob(this.workflowJobForm.value)
      .subscribe(data => {
        console.log(data);
        this.createdJobNumber=data.toString();
        document.getElementById("openModel").click();
        this.showToasterMessage('success', 'Notification', 'Workflow Job successfully saved!');

        this.initializeForm();
      }
        ,
        errorCode => {
          this.showToasterMessage('error', 'Notification', 'Error saving workflow job!');
        }

      );
  }




  onProposalSearchSubmit() {
    this.searchProposal = new SearchProposal();
    this.searchProposal.QuotationNo = this.searchProposalForm.value.QuotationNo;
    this.searchProposal.ProposalNo = this.searchProposalForm.value.ProposalNo;
    this.searchProposal.BankId = this.searchProposalForm.value.BankId;
    this.searchProposal.HnbaBranchCode = this.searchProposalForm.value.HnbaBranchCode;
    this.searchProposal.LoanTypeId = this.searchProposalForm.value.LoanTypeId;
    this.searchProposal.Life1NIC = this.searchProposalForm.value.Life1NIC;
    this.searchProposal.Life1Name = this.searchProposalForm.value.Life1Name;
    this.searchProposal.Life2NIC = this.searchProposalForm.value.Life2NIC;
    this.searchProposal.Life2Name = this.searchProposalForm.value.Life2Name;


    this.searchProposalService.SearchUnassignedProposal(this.searchProposal)
      .subscribe(
        data => this.proposaldata = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Proposal!'));

  }

  onProposaSelectSubmit(seqId, proposalNo) {
    this.workflowJobForm.patchValue(
      {
        ProposalNo: proposalNo
      });

  }





  showToasterMessage(type, title, message) {
    this.toasterService.pop(type, title, message);
  }




}
