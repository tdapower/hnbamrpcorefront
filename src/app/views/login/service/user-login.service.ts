import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../../shared/config/url.constants';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {


  options: RequestOptions;
  constructor(private http: Http) { }


  getUserCompany() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.USR_MGT_URL_PREFIX + 'api/UserCompany/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      });
  }


  CheckAndLoadUser(guuguugaagaa) {
    let body = guuguugaagaa;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(URL_CONST.USR_MGT_URL_PREFIX + 'api/UserAccount/checkAndLoadUser', body, options)
      .map((response: Response) => JSON.stringify(response.json()))
      .timeout(60000)
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      });
  }

  logout(): void {
    localStorage.removeItem('currentMRPUser');
  }

}
