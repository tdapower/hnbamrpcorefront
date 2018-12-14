import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Http } from '@angular/http';
import { SearchWorkflowjobService } from './search-workflowjob.service';
import { SearchWorkflowjob } from '../models/searchWorkflowjob.model';
import { MRPUser } from '../../common-functions/models/mrpUser.model';
import { CommonFunctionsService } from '../../common-functions/common-functions.service';

@Component({
  selector: 'app-search-workflowjob',
  templateUrl: './search-workflowjob.component.html',
  styleUrls: ['./search-workflowjob.component.scss',
    '../../../../scss/vendors/toastr/toastr.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class SearchWorkflowjobComponent implements OnInit {



  searchWorkflowjob: SearchWorkflowjob;
  searchWorkflowjobForm: FormGroup;

  mRPUsers: MRPUser[];
  public data;
  
  public unassignedData;
  

  constructor(private http: Http, private searchWorkflowjobService: SearchWorkflowjobService, toasterService: ToasterService,
    private formBuilder: FormBuilder, private commonFunctionsService: CommonFunctionsService) {

  }

  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 1000
    });



  ngOnInit() {

    // this.getAllCustomers();

    this.initializeForm();
    this.getMRPUsers();

    this. loadUnassignedJobs();
  }


  initializeForm() {
    this.searchWorkflowjobForm = this.formBuilder.group({
      JobNo: [''],
      ProposalNo: [''],
      LifeAssure1NIC: [''],
      LifeAssure2NIC: [''],
      AssignedUserCode: ['']
    });


  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }


  getMRPUsers() {
    this.commonFunctionsService.getMRPUsers()
      .subscribe(
        data => this.mRPUsers = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Users!'));
  }



  onSubmit() {
    this.searchWorkflowjob = new SearchWorkflowjob();
    this.searchWorkflowjob.JobNo = this.searchWorkflowjobForm.value.JobNo;
    this.searchWorkflowjob.ProposalNo = this.searchWorkflowjobForm.value.ProposalNo;
    this.searchWorkflowjob.LifeAssure1NIC = this.searchWorkflowjobForm.value.LifeAssure1NIC;
    this.searchWorkflowjob.LifeAssure2NIC = this.searchWorkflowjobForm.value.LifeAssure2NIC;
    this.searchWorkflowjob.AssignedUserCode = this.searchWorkflowjobForm.value.AssignedUserCode;


    this.searchWorkflowjobService.searchWorkflowjobs(this.searchWorkflowjob)
      .subscribe(
        data => this.data = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Workflow Jobs!'));

  }

  loadUnassignedJobs() {
    

    this.searchWorkflowjobService.getUnassWorkflowJobs()
      .subscribe(
        data => this.unassignedData = data,
        errorCode => this.showToasterMessage('error', 'Notification', 'Error Loading Workflow Jobs!'));

  }



  showToasterMessage(type, title, message) {
    this.toasterService.pop(type, title, message);
  }


}
