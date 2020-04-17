import { Component, OnInit, Input } from "@angular/core";
import { TableService } from "../../shared/table.service";
import { ModalService } from "../../shared/modal.service";
import { AddNewItemComponent } from "../../add-new-item/add-new-item.component";

@Component({
  selector: "app-row",
  templateUrl: "./row.component.html",
  styleUrls: ["./row.component.scss"],
})
export class RowComponent implements OnInit {
  @Input() row: any;
  @Input() rowIndex: number;
  constructor(
    private tableService: TableService,
    private modalService: ModalService
  ) {}

  ngOnInit() {}

  onDeleteRow() {
    this.tableService.deleteRow(this.row);
  }

  editRow() {
    this.tableService.initCols();

    this.tableService.editRow(this.row);
    this.modalService.openModal(AddNewItemComponent, "sm");
  }
}
