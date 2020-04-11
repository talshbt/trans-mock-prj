import {
  Component,
  OnInit,
  OnDestroy
} from "@angular/core";
import { TableService } from "../shared/table.service";
import { AddNewItemComponent } from "../add-new-item/add-new-item.component";
import { Subscription } from "rxjs";
import { ModalService } from '../shared/modal.service';
// import { TableComponent } from '../table/table.component';

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit, OnDestroy {
  sub: Subscription;
  cols = [];
  rowDetailsArr = [];
  searchText: string;

  constructor(
   
    private tableService: TableService,
    private modalService :ModalService
  ) {}

  ngOnInit() {
    this.sub = this.tableService.rowChanged.subscribe(rowDetailsArr => {
      this.rowDetailsArr = rowDetailsArr;
    });

    this.cols = this.tableService.getCols();
    // this.rowDetailsArr = this.tableService.getTempArr();
    //  console.log(this.cols);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openModal() {
    this.modalService.openModal(AddNewItemComponent);
    // this.modalService.openModal(TableComponent);
  }

  onDeleteRow(rowIndex) {
    this.tableService.deleteRow(rowIndex);
  }
  editRow(rowIndex) {
    this.tableService.editRow(rowIndex);
    this.openModal();
  }
}
