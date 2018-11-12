import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { URL_CONST } from '../../shared/config/url.constants';
import { CurrentUser } from '../../shared/config/user';
import { Nationality } from './models/nationality.model';
import { NICExtractedData } from './models/nICExtractedData.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  options: RequestOptions;

  constructor(private http: Http) { }


  getNationality(): Observable<Nationality[]> {
    let ReqHeaders = new Headers({ 'Content-Type': 'application/json' });
    ReqHeaders.append('Authorization', CurrentUser.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: ReqHeaders });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetNationalityList', options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  public calculateAge(DOB, CurDate) {
    var dob = new Date(DOB);
    var cur_date = new Date(CurDate);
    var diffInDays = ((cur_date.getTime() - dob.getTime()) / 1000) / (60 * 60 * 24);
    var diffInYears = diffInDays / 365;
    return diffInYears;
  }

  public calculateBMI(height, weight): any {
    var finalBmi = weight / (height / 100 * height / 100)
    return finalBmi.toFixed(2);
  }


  public extractDataFromNIC(NICNo) {
    let Year: string = '';
    let Month: string = '';
    let Day: number = 0;
    let isValid: boolean = false;

    let NICExtractedData = <NICExtractedData>{};


    if (NICNo.length == 10) //Validation 1::Checking The Length Of The NIC Entered
    {
      NICNo = NICNo.substr(0, 9);

      Year = NICNo.substr(0, 2); //Getting The Year

      console.log('aaa  ' + NICNo.substr(2, 2));

      NICNo = NICNo.substr(2, 3);
      Day = NICNo;
      NICExtractedData.Gender = "M";

      if (Day > 500) //Can Be Women's NIC No
      {
        Day = Day - 500;
        NICExtractedData.Gender = "F";
      }

      if (Day > 0 && Day < 367) //Validation 3::Validating The Days In The Entered NIC
      {
        isValid = true;
        if (Day > 335) {
          Day = Day - 335;
          Month = "12";
        }
        else if (Day > 305) {
          Day = Day - 305;
          Month = "11";
        }
        else if (Day > 274) {
          Day = Day - 274;
          Month = "10";
        }
        else if (Day > 244) {
          Day = Day - 244;
          Month = "09";
        }
        else if (Day > 213) {
          Day = Day - 213;
          Month = "08";
        }
        else if (Day > 182) {
          Day = Day - 182;
          Month = "07";
        }
        else if (Day > 152) {
          Day = Day - 152;
          Month = "06";
        }
        else if (Day > 121) {
          Day = Day - 121;
          Month = "05";
        }
        else if (Day > 91) {
          Day = Day - 91;
          Month = "04";
        }
        else if (Day > 60) {
          Day = Day - 60;
          Month = "03";
        }
        else if (Day < 32) {
          Month = "01";
        }
        else if (Day > 31) {
          console.log('aaaaaaas');

          Day = Day - 31;
          Month = "02";
        }
      }


      if (Day.toString().length == 3) {

        Day = Number(Day.toString().substring(1, 3));

      }
      NICExtractedData.DOB = this.padLeft(Day, 2, '0') + "/" + Month + "/19" + Year;



    }
    else if (NICNo.length == 12) //Validation 1::Checking The Length Of The NIC Entered
    {

      console.log('ppppp1');
      console.log(NICNo);



      NICNo = NICNo.substr(0, 12);

      Year = NICNo.substr(0, 4); //Getting The Year
      NICNo = NICNo.substr(4, 3);

      Day = NICNo;
      NICExtractedData.Gender = "M";

      if (Day > 500) //Can Be Women's NIC No
      {
        Day = Day - 500;
        NICExtractedData.Gender = "F";
      }

      if (Day > 0 && Day < 367) //Validation 3::Validating The Days In The Entered NIC
      {
        isValid = true;
        if (Day > 335) {
          Day = Day - 335;
          Month = "12";
        }
        else if (Day > 305) {
          Day = Day - 305;
          Month = "11";
        }
        else if (Day > 274) {
          Day = Day - 274;
          Month = "10";
        }
        else if (Day > 244) {
          Day = Day - 244;
          Month = "09";
        }
        else if (Day > 213) {
          Day = Day - 213;
          Month = "08";
        }
        else if (Day > 182) {
          Day = Day - 182;
          Month = "07";
        }
        else if (Day > 152) {
          Day = Day - 152;
          Month = "06";
        }
        else if (Day > 121) {
          Day = Day - 121;
          Month = "05";
        }
        else if (Day > 91) {
          Day = Day - 91;
          Month = "04";
        }
        else if (Day > 60) {
          Day = Day - 60;
          Month = "03";
        }
        else if (Day < 32) {
          Month = "01";
        }
        else if (Day > 31) {
          Day = Day - 31;
          Month = "02";
        }
      }
      if (Day.toString().length == 3) {

        Day = Number(Day.toString().substring(1, 3));

      }




      NICExtractedData.DOB = this.padLeft(Day, 2, '0') + "/" + Month + "/" + Year;

    }
    console.log(NICExtractedData);


    return NICExtractedData;
  }

  private padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
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
