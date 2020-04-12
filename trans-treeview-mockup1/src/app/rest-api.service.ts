import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class RestApiService {
  apiURL = 'http://localhost:4444';
  condition = false;
   
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })

  }  

  transName = null;

  constructor(private http: HttpClient) { }

   // HttpClient API get() method => Fetch employees list
  getArr(transName, tatSherutName): Observable<any> {
    let params = new HttpParams();
    if(this.condition) {
      params = params.append('conditionalString', 'I really dont give a shit');
    }

    // this.transName = 'luAnc1ServerData';
    return this.http.get<any>(this.apiURL + '/trans/' + transName)
    .pipe(
      retry(1),
      
    )

   
  }

  


}
