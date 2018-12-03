import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { URL_CONST } from '../../../shared/config/url.constants';


import { CurrentUser } from '../../../shared/config/user';
import { MedicalLetter } from '../models/medicalLetter.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateMedicalletterService {

  options: RequestOptions;

  constructor(private http: Http) { }



  createMedicalLetter(medicalLetter: MedicalLetter): Observable<number> {

    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });


    return this.http.post(URL_CONST.URL_PREFIX + 'api/MedicalLetter/AddMedicalLetter', medicalLetter, options)
    .map(this.extractData)
      .timeout(60000)
      .catch(this.handleError);
  }

  updateMedicalLetter(medicalLetter: MedicalLetter): Observable<number> {

    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });


    return this.http.post(URL_CONST.URL_PREFIX + 'api/MedicalLetter/UpdateMedicalLetter', medicalLetter, options)
    .map(this.extractData)
      .timeout(60000)
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
