import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TreeTransMockupService } from "../shared/tree-trans-mockup.service";
import { TableTransMockupService } from "../shared/table-trans-mockup.service";
import { TableComponent } from "../table-trans-mockup/table/table.component";
import { ModalService } from "../shared/modal.service";

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
    private transService: TreeTransMockupService,
    private tableTransMockupService: TableTransMockupService,
    private modalService: ModalService,

  ) {}
  ngOnInit() {
    this.subscription = this.transService.detailsChanged.subscribe((data) => {
      this.transName = data.transName;
      this.tatSherutName = data.tatSherutName;

      
    });

    this.transService.getTreeEvent.subscribe((formDataObj) => {
      this.form = formDataObj['form']
      this.transTree = formDataObj['transDict2']
    
    });



  }

  onSubmit() {

    this.transService.getTreeFromClient(this.form.value)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




  onOpenTable(parent){
    console.log(parent)
    this.tableTransMockupService.getCols2(parent)
    // this.tableTransMockupService.getCols2();
    this.modalService.openModal(TableComponent, "lg");

  }
}


