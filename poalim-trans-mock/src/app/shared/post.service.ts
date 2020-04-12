import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from "@angular/common/http";
import { map, catchError, tap, take, exhaustMap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PostService {
  rowsArr = [];
  private cols = ["id", "name", "email"];

  constructor(private http: HttpClient) { }
  getCols() {
    return this.cols;
  }yield

   getRows() {
    return this.rowsArr.slice();
  }

  postNewRow(newRow){
    //  for(var i = 0 ; i < this.cols.length; ++i){
    //     newRow[this.cols[i]] = this.signupForm.value[this.cols[i]];
    //   }
    console.log("need to save data in db :")
    console.log(newRow)
  }
}



