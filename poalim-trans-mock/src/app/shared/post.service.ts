import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private cols = ["id", "name", "email"];
  private rows = [];

  constructor(private http: HttpClient) { }
  httpData:any;

  getCols(){
     this.http.get("http://localhost:5555").subscribe(data => {
      this.httpData=data;
      console.log(data)
    })
    return this.cols;
  }

  getRows(){

  }

  getNewRowFromClient(){

  }

  private sendNewRowToDB(){

  }

  getRowsFromDb(){

  }

}