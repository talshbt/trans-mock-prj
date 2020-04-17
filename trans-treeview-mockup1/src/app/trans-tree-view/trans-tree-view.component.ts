import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestApiService } from "../rest-api.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransService } from "../shared/trans.service";
import { TransDetails } from "../shared/trans-details.model";

@Component({
  selector: 'app-trans-tree-view',
  templateUrl: './trans-tree-view.component.html',
  styleUrls: ['./trans-tree-view.component.scss']
})
export class TransTreeViewComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  title = 'an-mockup-trans0';
  count = 0;
  arr = {};
  //  transName = 'luAnc1ServerData';
  transName = null;

  tatSherutName = null;

  constructor(public restApi: RestApiService, private transService: TransService) {

  }

  ngOnInit() {
    this.subscription = this.transService.detailsChanged.subscribe(
      data => {
        this.transName = data.transName;
        this.tatSherutName = data.tatSherutName;


        // this.restApi.getArr('luAnc1ServerData', null).subscribe((data: {}) => {
        //   this.arr = data;
        // })


        this.transService.getTreeEvent.subscribe(tree=>{
          this.arr = tree;
        })


      }
    );


    // console.log(this.transName)




    this.transService.getTreeEvent.subscribe(tree=>{
      this.arr = tree;
    })



  }

  getHttpReq() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }





}












// ngOnInit(){
//     this.subscription =  this.transService.detailsChanged.subscribe(
//           data => 
//           {
//             this.transName = data.transName;
//             this.tatSherutName = data.tatSherutName;


//             this.restApi.getArr(this.transName, null).subscribe((data: {}) => {
//             this.arr = data;
//         })


//           }
//         );




//     this.restApi.getArr(this.transName, null).subscribe((data: {}) => {

//       //console.log(data);
//       this.arr = data;
//       // console.log(this.arr)

//       // for (var p in this.arr) {
//       //   console.log("parent ="+ p)
//       //   console.log("len = " + this.arr[p].length);
//       //   for (var i in this.arr[p]){

//       //     console.log("child = "  + this.arr[p][i])

//       //   }
//       // }
//     })



//   }