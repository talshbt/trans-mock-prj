import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse} from '@angular/common/http';
import {tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  rowsArr = [];
  private cols = ["id", "name", "email"];
  baseApiURL = 'http://localhost:3128';
  condition = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })

  }  
  constructor(private http: HttpClient) { }
  getCols() {
    return this.cols;
  }

   getRows() {
    return this.rowsArr.slice();
  }

  postNewRow(newRow){

    let res = this.http.get(this.baseApiURL, {
      params: {
        appid: 'id1234',
        cnt: '5'
      },
      observe: 'response'
    })//.pipe(retry(1))
    .toPromise()
    .then(response => {
      console.log(response);
      return res;    
    })
    .catch(e=>console.error(e));
  }

  

// getAll() {
//   console.log('getAll')

//   let retObj = {
//     "row" : 200,
//     "x" : "developers"
//   }
//   let res = this.http.get(this.baseApiURL + '/trans/', {
//     body: {
//       data: JSON.stringify(retObj)
//     },
//     observe: 'response'
//   })//.pipe(retry(1))
//   .toPromise()
//   .then(response => {
//     console.log(response);
//     return res;    
//   })
//   .catch(e=>console.error(e));
// }
getAll(){

 //   console.log('getAll')

  let retObj = {
    "row" : 200,
    "x" : "developers"
  }

  let body  = JSON.stringify(retObj);

  let res = this.http.post(this.baseApiURL + '/trans/', {
    body
    ,
    observe: 'response'
  })
  .toPromise()
  .then(response => {
    console.log(response);
    return res;    
  })
  .catch(e=>console.error(e));
}


  

}



