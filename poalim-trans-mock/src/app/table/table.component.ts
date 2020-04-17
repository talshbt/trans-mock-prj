import { Component, OnInit, OnDestroy } from "@angular/core";
import { TableService } from "../shared/table.service";
import { AddNewItemComponent } from "../add-new-item/add-new-item.component";
import { Subscription } from "rxjs";
import { ModalService } from "../shared/modal.service";
import { PostService } from "../shared/post.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit, OnDestroy {
  dataChangedSub: Subscription;
  gotColsSub: Subscription;

  cols = [];
  rowDetailsArr = [];
  searchText: string;
  modalClothed;

  constructor(
    private tableService: TableService,
    private modalService: ModalService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.tableService.initCols();
    this.dataChangedSub = this.tableService.dataChanged2.subscribe((rows) => {
      this.rowDetailsArr = rows;
    });

    this.gotColsSub = this.tableService.gotCols.subscribe((cols) => {
      this.cols = cols;
    });

    this.postService
      .getRows()
      .toPromise()
      .then((res) => (this.rowDetailsArr = res));
  }

  ngOnDestroy() {
    this.dataChangedSub.unsubscribe();
  }

  openModal() {
    this.tableService.initCols();
    this.modalService.openModal(AddNewItemComponent, "sm");
  }

  onDeleteRow(rowIndex) {
    this.tableService.deleteRow(rowIndex);
  }
}
