import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TreeTransMockupService } from "../shared/tree-trans-mockup.service";

@Component({
  selector: "app-trans-tree-view",
  templateUrl: "./trans-tree-view.component.html",
  styleUrls: ["./trans-tree-view.component.scss"],
})
export class TransTreeViewComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private form = null;
  private transTree = {};
  transName = null;
  tatSherutName = null;
  constructor(
   
    private transService: TreeTransMockupService
  ) {}
  ngOnInit() {
    this.subscription = this.transService.detailsChanged.subscribe((data) => {
      this.transName = data.transName;
      this.tatSherutName = data.tatSherutName;

      
    });

    this.transService.getTreeEvent2.subscribe((formDataObj) => {
      this.form = formDataObj['form']
      this.transTree = formDataObj['transDict2']
     
      
    });

  }

  onSubmit() {

    console.log(this.form.value)

    this.transService.getTreeFromClient(this.form.value)

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




  onOpenTable(parent){
    console.log(parent)

  }
}


