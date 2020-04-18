import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  baseApiURL = "http://localhost:7777";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {}

  //get tree
  getTree(fieldName) {
    return this.http.post<Object[]>(this.baseApiURL + "/getTree/", {
      fieldName,
    });
  }

  //posttree data

}
