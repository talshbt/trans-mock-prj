import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TreeTransMockupService } from "../shared/tree-trans-mockup.service";

@Component({
  selector: "app-trans-tree-view",
  templateUrl: "./trans-tree-view.component.html",
  styleUrls: ["./trans-tree-view.component.scss"],
})
export class TransTreeViewComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private form = null;
  private transTree = {};
  private transName = null;
  private tatSherutName = null;
  constructor(
   
    private transService: TreeTransMockupService
  ) {}
  ngOnInit() {
    this.subscription = this.transService.detailsChanged.subscribe((data) => {
      this.transName = data.transName;
      this.tatSherutName = data.tatSherutName;

      
    });

    this.transService.getTreeEvent.subscribe((formDataObj) => {
      this.form = formDataObj['form']
      this.transTree = formDataObj['transDict2']

      // console.log("------------formDataObj['transDict2']-------------1")
      // console.log( this.transTree)
     
      
    });

    this.transService.getCurrentTreeEvent.subscribe((formDataObj) => {

      // console.log( formDataObj['form'])
      // console.log("------------formDataObj['transDict2']-------------1")
      // console.log( this.transTree)

      // console.log("------------------------------------")

      // console.log("------------formDataObj['transDict2']-------------2")

      // console.log( formDataObj['transDict2'])
      // console.log("------------------------------------")

      
    });

  }

  onSubmit() {

    // console.log(this.form.value)

    this.transService.getTreeFromClient(this.form.value)

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




  onOpenTable(parent){
    console.log(parent)

  }
}


