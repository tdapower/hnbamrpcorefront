import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";


import { URL_CONST } from '../../../shared/config/url.constants';
import { CurrentUser } from '../../../shared/config/user';
import { SearchWorkflowjob } from '../models/searchWorkflowjob.model';
import { Workflowjob } from '../models/workflowjob.model';
@Injectable({
  providedIn: 'root'
})
export class SearchWorkflowjobService {

  options: RequestOptions;

  constructor(private http: Http) { }




  searchWorkflowjobs(searchWorkflowjob: SearchWorkflowjob): Observable<Workflowjob[]> {

    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });

    return this.http.post(URL_CONST.URL_PREFIX + 'api/WorkflowJob/SearchWorkflowJob', searchWorkflowjob, options)
      .map(this.extractData)
      .catch(this.handleError);
  }



  getUnassWorkflowJobs(): Observable<Workflowjob[]> {

    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/WorkflowJob/GetUnassWorkflowJobs', options)
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
