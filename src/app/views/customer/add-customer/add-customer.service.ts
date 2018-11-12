import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { URL_CONST } from '../../../shared/config/url.constants';
import { Customer } from '../models/customer.model';


import { CurrentUser } from '../../../shared/config/user';

@Injectable({
  providedIn: 'root'
})
export class AddCustomerService {

  options: RequestOptions;

  constructor(private http: Http) { }



  createCustomer(customer: Customer): Observable<number> {

    console.log('CurrentUser = ' + CurrentUser.USER_AUTH_TOKEN);

    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });

    console.log(customer.toString());

    return this.http.post(URL_CONST.URL_PREFIX + 'api/Assure/AddCustomer', customer, options)
      .map(success => success.status)
      .catch(this.handleError);
  }




  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
