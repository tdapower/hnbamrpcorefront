declare var require: any;
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IOption } from 'ng-select';
import { User } from '../../common-functions/models/user.model';
import { Hospital } from '../../hospital/models/hospital.model';
import { SignPerson } from '../../common-functions/models/signPerson.model';
import { HospitalService } from '../../hospital/hospital.service';
import { CommonFunctionsService } from '../../common-functions/common-functions.service';
import { SearchCustomer } from '../../customer/models/searchCustomer.model';
import { SearchCustomerService } from '../../customer/search-customer/search-customer.service';
import { SearchProposal } from '../../proposal/models/searchProposal.model';
import { SearchProposalService } from '../../proposal/search-proposal/search-proposal.service';
import { Bank } from '../../common-functions/models/bank.model';
import { HnbaBranch } from '../../common-functions/models/hnbaBranch.model';
import { LoanType } from '../../common-functions/models/loanType.model';
import { GenerateMedicalletterService } from './generate-medicalletter.service';
import { MedicalTest } from '../../medicaltest/models/medicalTest.model';
import { MedicaltestService } from '../../medicaltest/medicaltest.service';
import { URL_CONST } from '../../../shared/config/url.constants';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-generate-medicalletter',
  templateUrl: './generate-medicalletter.component.html',
  styleUrls: ['./generate-medicalletter.component.scss',
    '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../scss/vendors/ng-select/ng-select.scss',
    '../../../../scss/vendors/toastr/toastr.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class GenerateMedicalletterComponent implements OnInit {



  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });



  medicalletterForm: FormGroup;

  medicalTestsForm: FormGroup;


  searchCustomer: SearchCustomer;
  searchCustomerForm: FormGroup;

  searchProposal: SearchProposal;
  searchProposalForm: FormGroup;


  User: User;

  hospitals: Hospital[];
  signPersons: SignPerson[];
  banks: Bank[];
  hnbaBranches: HnbaBranch[];
  loanTypes: LoanType[];

  medicalTests: MedicalTest[];

  checkedMedicalTests: MedicalTest[] = [];

  isMedicalLetterDataSaved: boolean = false;

  medicalLetterId: number = 0;
  MedicalLetterDocURL: any;

  saveMode: string = "new";

  public data;
  public proposaldata;


  isLoading: boolean = false;


  constructor(private formBuilder: FormBuilder,
    toasterService: ToasterService, private hospitalService: HospitalService, private commonFunctionsService: CommonFunctionsService
    , private searchCustomerService: SearchCustomerService, private searchProposalService: SearchProposalService,
    private generateMedicalletterService: GenerateMedicalletterService, private medicaltestService: MedicaltestService,
    public sanitizer: DomSanitizer) {
    this.toasterService = toasterService;





  }

  ngOnInit() {

    this.initializeForm();
    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));
    this.getHospitals();
    this.getSignPersons();

    this.getBanks();
    this.getHnbaBranches();
    this.getLoanTypes();
    this.getMedicalTests();




  }

  initializeForm() {
    this.isMedicalLetterDataSaved = false;
    this.saveMode = "new";
    this.medicalletterForm = this.formBuilder.group({
      SeqId: [0],
      AssureId: [0],
      AssureName: [''],
      MainId: [0],
      HospitalId: [0],
      LetterDate: [''],
      LetterType: [''],
      SignPersonUserCode: [''],
      Document: [''],
      SystemDate: [''],
      GeneratedUser: [''],
      ProposalNo: [''],
      SelectedMedicalTests: []
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




    this.searchCustomerForm = this.formBuilder.group({
      Name: [''],
      NIC: [''],
      Address: ['']
    });


    this.medicalTestsForm = this.formBuilder.group({
      SeqId: [0],
      TestName: [''],
      IsSelected: [0]
    });
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }


  getHospitals() {
    this.hospitalService.getAllHospitals()
      .subscribe(
        data => this.hospitals = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Hospitals!'));
  }

  getSignPersons() {
    this.commonFunctionsService.getAllSignPersons()
      .subscribe(
        data => this.signPersons = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Sign Persons!'));
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

  getMedicalTests() {
    this.medicaltestService.getAllMedicalTests()
      .subscribe(
        data => this.medicalTests = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Medical Tests!'));
  }



  onCustomerSearchSubmit() {
    this.searchCustomer = new SearchCustomer();
    this.searchCustomer.Name = this.searchCustomerForm.value.Name;
    this.searchCustomer.NIC = this.searchCustomerForm.value.NIC;
    this.searchCustomer.Address = this.searchCustomerForm.value.Address;

    this.searchCustomerService.searchCustomers(this.searchCustomer)
      .subscribe(
        data => this.data = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Customers!'));

  }

  onCustomerSelectSubmit(customerId, customerName) {
    this.medicalletterForm.patchValue(
      {
        AssureId: customerId,
        AssureName: customerName
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


    this.searchProposalService.searchProposal(this.searchProposal)
      .subscribe(
        data => this.proposaldata = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Proposal!'));

  }

  onProposaSelectSubmit(seqId, proposalNo) {
    this.medicalletterForm.patchValue(
      {
        MainId: seqId,
        ProposalNo: proposalNo
      });

  }

  onCheckboxChange(option, event) {


    if (event.target.checked) {
      this.checkedMedicalTests.push(option.SeqId);
    } else {
      for (var i = 0; i < this.medicalTests.length; i++) {
        if (this.checkedMedicalTests[i] == option.SeqId) {
          this.checkedMedicalTests.splice(i, 1);
        }
      }
    }
  }



  onSubmit() {

    this.isLoading = true;
    this.medicalletterForm.patchValue(
      {
        SelectedMedicalTests: this.checkedMedicalTests
      });

    if (this.saveMode == "new") {
      this.generateMedicalletterService.createMedicalLetter(this.medicalletterForm.value)
        .subscribe(data => {
          this.saveMode = "update";
          this.medicalLetterId = data;


          this.medicalletterForm.patchValue(
            {
              SeqId: data
            });


          this.isMedicalLetterDataSaved = true;
          this.isLoading = false;
          this.showToasterMessage('success', 'Notification', 'Medical letter successfully saved!');
          // this.initializeForm();
          this.displayMedicalLetter();

        },
          (err) => {
            console.log(err);
            this.isLoading = false;
            this.showToasterMessage('error', 'Notification', 'Error saving Medical letter!');
          });

    }
    else if (this.saveMode == "update") {
      this.generateMedicalletterService.updateMedicalLetter(this.medicalletterForm.value)
        .subscribe(data => {
          this.saveMode = "update";
          this.medicalLetterId = data;
          this.isMedicalLetterDataSaved = true;
          this.isLoading = false;
          this.showToasterMessage('success', 'Notification', 'Medical letter successfully saved!');
          // this.initializeForm();
          this.displayMedicalLetter();

        },
          (err) => {
            console.log(err);
            this.isLoading = false;
            this.showToasterMessage('error', 'Notification', 'Error saving Medical letter!');
          });

    }




  }



  displayMedicalLetter() {
    if (this.medicalLetterId == 0) {
      this.showToasterMessage('error', 'Notification', "Please save before view Medical Letter");
      return;
    }
    if (this.medicalLetterId != 0) {

      if (this.medicalletterForm.value.LetterType == "Credit") {
        let url: any;
        url = URL_CONST.DOC_SERVER_URL_PREFIX + 'api/MedicalLetter/GetMedicalLetterCreditDocument/' + this.medicalLetterId;
        this.MedicalLetterDocURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        document.getElementById("openMedicalLetterModalButton").click();
      } else if (this.medicalletterForm.value.LetterType == "Non-Credit") {
        let url: any;
        url = URL_CONST.DOC_SERVER_URL_PREFIX + 'api/MedicalLetter/GetMedicalLetterNonCreditDocument/' + this.medicalLetterId;
        this.MedicalLetterDocURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        document.getElementById("openMedicalLetterModalButton").click();
      }
    }



  }


  showToasterMessage(type, title, message) {
    this.toasterService.pop(type, title, message);
  }


}
