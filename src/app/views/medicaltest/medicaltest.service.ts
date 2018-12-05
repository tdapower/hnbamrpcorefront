

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { URL_CONST } from '../../shared/config/url.constants';
import { CurrentUser } from '../../shared/config/user';
import { MedicalTest } from './models/medicalTest.model';
@Injectable({
  providedIn: 'root'
})
export class MedicaltestService {

  options: RequestOptions;

  constructor(private http: Http) { }




  getAllMedicalTests(): Observable<MedicalTest[]> {

    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/MedicalTest/GetAllMedicalTests', options)
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
