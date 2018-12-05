import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Http } from '@angular/http';
import { SearchProposal } from '../models/searchProposal.model';
import { SearchProposalService } from './search-proposal.service';
import { Bank } from '../../common-functions/models/bank.model';
import { CommonFunctionsService } from '../../common-functions/common-functions.service';
import { LoanType } from '../../common-functions/models/loanType.model';
import { HnbaBranch } from '../../common-functions/models/hnbaBranch.model';

@Component({
  selector: 'app-search-proposal',
  templateUrl: './search-proposal.component.html',
  styleUrls: ['./search-proposal.component.scss',
    '../../../../scss/vendors/toastr/toastr.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class SearchProposalComponent implements OnInit {



  searchProposal: SearchProposal;
  searchProposalForm: FormGroup;

  banks: Bank[];
  hnbaBranches: HnbaBranch[];
  loanTypes: LoanType[];




  public data;


  constructor(private http: Http, private searchProposalService: SearchProposalService, private commonFunctionsService: CommonFunctionsService,
    toasterService: ToasterService,
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
    this.getBanks();
    this.getHnbaBranches();
    this.getLoanTypes();
  }

  getBanks() {
    this.commonFunctionsService.getBank()
      .subscribe(
        data => this.banks = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Banks!'));
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




  initializeForm() {
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


    this.searchProposalService.searchProposal(this.searchProposal)
      .subscribe(
        data => this.data = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Proposal!'));

  }



  showToasterMessage(type, title, message) {
    this.toasterService.pop(type, title, message);
  }


}
