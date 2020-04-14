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
  private cols = [ "id", "x", "y", "z"];
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

    // console.log(newRow)
    
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
    

}

  


getRows(){
  return this.http.get<any[]>(this.baseApiURL + '/getRows/')


}

getCols1(){
  return this.http.get<any[]>(this.baseApiURL + '/getCols/')


}


removeRow(index){
  
  return this.http.post<Object[]>(this.baseApiURL + '/removeRow/', {
    index

  })
  // .toPromise()
  // .then(response => {
  //   // this.rows = response;
  //   // this.rows = response;
  //   console.log("after remove index " + index)
  //   console.log(response);
  //   return res;    
  // })
  // .catch(e=>console.error(e));
  

}

editRow(row, index){
  console.log(index)
    
    let res =  this.http.post<Object[]>(this.baseApiURL + '/editRow/', {
      row,
      index
      

    })
    .toPromise()
    .then(response => {
      // this.rows = response;
      this.rows = response;
      // console.log(response);
      return res;    
    })
    .catch(e=>console.error(e));
}


editRow2(index){
   
  return this.http.post<any>(this.baseApiURL + '/editRow2/', {
   
    index
    

  })

}
  

}



