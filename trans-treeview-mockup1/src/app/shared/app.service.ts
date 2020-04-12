import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})


export class AppService {

  public stringSubject = new Subject<string>();

  passValue(data) {
    //passing the data as the next observable
    this.stringSubject.next(data);
  }

}
