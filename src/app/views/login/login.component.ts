import { Component, SecurityContext, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';

import { User } from '../../shared/models/user';

import { CurrentUser } from '../../shared/config/user';
import { UserCompany } from '../../shared/models/userCompany';
import { UserLoginService } from './service/user-login.service';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}



@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styles: [
    `
  .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class LoginComponent {


  public companyList: UserCompany[];


  User: User;
  UserName: string;
  UserCompany: string='0';
  Password: string;
  EnteredRanNo: number;
  ranNo: number = 0;

  isLoading: boolean;
  IsValid: boolean = true;

  alertType: string = '';
  alertMsg: string = '';

  constructor(private router: Router,
    private userLoginService: UserLoginService, sanitizer: DomSanitizer) {

  }


  ngOnInit() {
    this.getUserCompanies();


    this.ranNo = this.getRandomInt(1, 25);
  }



  getUserCompanies() {
    this.userLoginService.getUserCompany()
      .subscribe((data) => {
        console.log(data);

        this.companyList = data
      },
        (err) => {
          console.log(err);
        });
  }


  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  public validateUser() {

    this.alertType = "";
    this.alertMsg = "";

    if (this.UserName == null || this.Password == null) {

      this.alertType = "danger";
      this.alertMsg = "Enter user name and password";


    } else {
      if (this.EnteredRanNo != this.ranNo) {

        this.alertType = "danger";
        this.alertMsg = "Incorrect validation number.";

      } else {
        this.checkUser();

      }
    }

  }



  private checkUser() {
    this.isLoading = true;

    let obj = {
      UserName: this.UserName,
      Company: this.UserCompany,
      Password: this.Password

    }
    this.userLoginService.CheckAndLoadUser(obj)
      .subscribe((data: any) => {


        this.isLoading = false;

        this.User = null;

        this.User = JSON.parse(data);


        if (this.User.UserName != null) {
          CurrentUser.USER_AUTH_TOKEN = 'Basic ' + btoa(this.User.UserName + ':' + this.User.Password + ':' + this.User.Company);
          console.log(CurrentUser.USER_AUTH_TOKEN);

          localStorage.setItem("currentMRPUser", JSON.stringify(this.User));
          localStorage.setItem("currentMRPUserToken", CurrentUser.USER_AUTH_TOKEN);

          /*     if (this.User.Password == COMMON_VALUES.COMMON_PWD) {
                this.router.navigate(['/', 'passwordChange']);
              } else {
                this.router.navigate(['/', 'mainDashboard']);
              } */
          this.router.navigate(['/', 'dashboard']);
        } else {


          this.alertType = "danger";
          this.alertMsg = "Invalid User name or Password...";

          let atCount = Number(localStorage.getItem('attemptCount'));
          atCount = atCount + 1;

          console.log('atCount =' + atCount);
          localStorage.setItem("attemptCount", atCount.toString());


          if (atCount >= 3) {



            this.alertType = "danger";
            this.alertMsg = "Maximum invalid login attempts reached, Try again in 30 seconds...";


            this.IsValid = false;

            this.UserName = null;
            this.Password = null;
            this.EnteredRanNo = null;

            this.ranNo = this.getRandomInt(1, 25);

            setTimeout(() => {
              this.IsValid = true;

              this.alertType = "";
              this.alertMsg = "";



              localStorage.setItem("attemptCount", "0");
            }, 30000)

          }

        }
      }),
      ((err) => {
        console.log(err);

        this.alertType = "danger";
        this.alertMsg = "Error while user login...";

      });
  }
}
