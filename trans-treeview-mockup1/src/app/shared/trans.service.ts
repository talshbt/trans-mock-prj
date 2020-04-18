import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { TransDetails } from "./trans-details.model";
import { DataStorageService } from '../data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TransService {
  detailsChanged = new Subject<TransDetails>();
  getTreeEvent = new Subject<any>();

  tree = {}
  // public subject = new Subject<any>();

  // passValue(data) {
  //   // console.log(data);
  //   //passing the data as the next observable
  //   this.subject.next(data);
  // }
 


  constructor(private dataStorage:DataStorageService) { }


  sendDetailsToTreeView(details){
    // console.log(details);
    this.detailsChanged.next(details);
    

  }


  getTree(fieldName){
    this.dataStorage.getTree(fieldName).toPromise().then(data => {

      this.tree = data;

    }).then((data) => this.getTreeEvent.next(this.tree));

  }
}
