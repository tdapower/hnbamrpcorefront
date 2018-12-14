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
import { SearchProposal } from '../../proposal/models/searchProposal.model';
import { SearchProposalService } from '../../proposal/search-proposal/search-proposal.service';
import { HnbaBranch } from '../../common-functions/models/hnbaBranch.model';
import { LoanType } from '../../common-functions/models/loanType.model';

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


  constructor(private formBuilder: FormBuilder, private editWorkflowjobService: EditWorkflowjobService,
    private workflowjobService: WorkflowjobService, private commonFunctionsService: CommonFunctionsService,
    toasterService: ToasterService, private route: ActivatedRoute,
    private router: Router, private searchProposalService: SearchProposalService) {
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

    this.getHnbaBranches();
    this.getLoanTypes();
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


  onSubmit() {

    this.workflowJobForm.patchValue(
      {
        IsFastTrack: this.workflowJobForm.value.IsFastTrack == true ? 1 : 0,
        IsFreeCoverLimitProposal: this.workflowJobForm.value.IsFreeCoverLimitProposal == true ? 1 : 0
      });

    console.log('this.workflowJobForm.valu   ' + JSON.stringify(this.workflowJobForm.value));


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
