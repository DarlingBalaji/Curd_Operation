import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
// import { BackendHost } from '../../assets/varconfig';

// const host = BackendHost;
const headers = new HttpHeaders()

@Injectable({
  providedIn: 'root'
})


export class CommonService {

  host = 'http://localhost:3800/';

  constructor(private http: HttpClient) { }

    // Create Employee
    postfunction(url,data): Observable<any> {
      return this.http.post(this.host+url, data, { headers: headers });
    }

    // Get All Employee
    getfunction(url): Observable<any> {
      // const headers = new HttpHeaders()
      return this.http.get(this.host+url);
    }

    // Update Employee
    updateEmployee(id, data): Observable<any> {
      let url = 'users/update';
      let UpdateUrl = `${url}/${id}`
      return this.http.put(this.host+UpdateUrl, data, { headers: headers }).pipe(
        // catchError(this.errorMgmt)
      )
    }

    // Delete employee
    deleteEmployee(id): Observable<any> {
      // const headers = new HttpHeaders()
      let url = 'users/delete'
      let Deleteurl = `${url}/${id}`;
      return this.http.delete(this.host+Deleteurl, { headers: headers }).pipe(
        // catchError(this.errorMgmt)
      )
    }

    //To View Single Employee
    getEmployee(url, id): Observable<any> {
      // console.log(id);
      // let Viewoneurl = `${url}/:${id}`;
      // console.log(Viewoneurl)
      return this.http.get(this.host+`${url}/${id}`, {headers: headers}).pipe(
        map((res: Response) => {
          return res || {}
        }),
        // catchError(this.errorMgmt)
      )
    }



    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}
