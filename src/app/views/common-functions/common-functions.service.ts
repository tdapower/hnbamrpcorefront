import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { URL_CONST } from '../../shared/config/url.constants';
import { CurrentUser } from '../../shared/config/user';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {

  options: RequestOptions;

  constructor(private http: Http) { }





  getBank() {
    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetAllBanks', options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getBankBranch() {
    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetAllBankBranches', options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getBankBranchByBankId(bankId) {
    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetBankBranchesOfBank/' + bankId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBroker() {
    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetAllBrokers', options)
      .map(this.extractData)
      .catch(this.handleError);
  }


 getBusinessChannels() {
    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetAllBusinessChannels', options)
      .map(this.extractData)
      .catch(this.handleError);
  }


 getModeOfProposals() {
    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetAllModeOfProposals', options)
      .map(this.extractData)
      .catch(this.handleError);
  }


 getMRPUsers() {
    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetAllMRPUsers', options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getPendingJobsOfUsers() {
    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetPendingJobsOfUsers', options)
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
