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
  rows:Object[] = [];
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

  //  getRows() {
  //   return this.rowsArr.slice();
  // }

  postNewRow(newRow){

    var response1;
    
    let res = this.http.post<Object[]>(this.baseApiURL + '/addNewRow/', {
      newRow

    })
    .toPromise()
    .then(response => {
      // this.rows = response;
      this.rows = response;
      // console.log(response);
      return res;    
    })
    .catch(e=>console.error(e));
    

    //  console.log(response1)
}

  
private getRowsFromServer(){
  return this.http.get<any[]>(this.baseApiURL + '/getRows/').
  toPromise().
  then(response => {
    console.log("response get all")
    console.log(response)
      this.rows = response;
      // return res;    
    });
}


getRows(){

  this.getRowsFromServer();
  // console.log(this.rows)
  return this.rows;
  // return this.http.get(this.baseApiURL + '/getRows/').
  // toPromise().
  // then(response => {
  //   console.log("response get all")
  //     console.log(response);
  //     // return res;    
  //   });
}


  

}



