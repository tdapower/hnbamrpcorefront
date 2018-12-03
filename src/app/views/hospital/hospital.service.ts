import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";


import { URL_CONST } from '../../shared/config/url.constants';
import { CurrentUser } from '../../shared/config/user';
import { Hospital } from './models/hospital.model';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  options: RequestOptions;

  constructor(private http: Http) { }




  getAllHospitals(): Observable<Hospital[]> {

    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Hospital/GetHospitals', options)
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
