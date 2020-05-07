import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TreeTransMockupService } from "../shared/tree-trans-mockup.service";
import { TableService } from "../parent-table/shared/table.service";
import { TableTransComponent } from '../parent-table/table-trans/table-trans.component';
import { ModalService } from "../parent-table/shared/modal.service";

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
    private tableTransMockupService: TableService,
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
    // this.tableTransMockupService.getCols2(parent)
    // this.tableTransMockupService.getCols2(parent);
    
    this.modalService.openModal(TableTransComponent, "lg");

  }
}


