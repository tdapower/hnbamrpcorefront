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
export class EditCustomerService {

  options: RequestOptions;

  constructor(private http: Http) { }

  getCustomerById(assureId: string): Observable<Customer> {
    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Assure/GetCustomer/' + assureId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  updateCustomer(customer: Customer): Observable<number> {

    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });

    return this.http.put(URL_CONST.URL_PREFIX + 'api/Assure/UpdateCustomer', customer, options)
      .map(success => success.status)
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
