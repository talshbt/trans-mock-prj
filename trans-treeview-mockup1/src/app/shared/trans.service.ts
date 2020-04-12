import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { TransDetails } from "./trans-details.model";

@Injectable({
  providedIn: 'root'
})
export class TransService {
  detailsChanged = new Subject<TransDetails>();
  // public subject = new Subject<any>();

  // passValue(data) {
  //   // console.log(data);
  //   //passing the data as the next observable
  //   this.subject.next(data);
  // }
 


  constructor() { }


  sendDetailsToTreeView(details){
    // console.log(details);
    this.detailsChanged.next(details);
    

  }
}
