import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { TableService } from "../shared/table.service";
import { ModalService } from "../shared/modal.service";

@Component({
  selector: "app-add-new-item",
  templateUrl: "./add-new-item.component.html",
  styleUrls: ["./add-new-item.component.scss"],
})
export class AddNewItemComponent implements OnInit, OnDestroy {
  rowToEdit = [];
  @ViewChild("f") signupForm: NgForm;
  cols = [];
  newCols = [];
  rowDetails = {};
  onEditMode = false;
  gotColsSub: Subscription;
  currentRow = {};
  rowValues = [];
  id = null;

  constructor(
    private tableService: TableService,
    private modalService: ModalService,
  ) {}


  ngOnDestroy(): void {
    this.gotColsSub.unsubscribe();
    
  }

  ngOnInit() {
    this.gotColsSub = this.tableService.gotCols.subscribe((cols) => {
      this.cols = cols;
      this.newCols = this.cols.slice(1, this.cols.length);
    });
    this.onEditMode = this.tableService.isEditMode();

    if (this.tableService.isEditMode()) {
      this.currentRow = this.tableService.currentRow;
      this.id = this.currentRow["id"];
      this.rowValues = Object.values(this.currentRow);
      this.rowToEdit = this.rowValues.slice(1, this.rowValues.length);
    } else {
      this.currentRow = {};
    }
  }

  private createObjToSend() {
    let rowDetails = [];
    let rowDetailsObj = {};
    for (var i = 0; i < this.cols.length; ++i) {
      rowDetails.push(this.signupForm.value[this.cols[i]]);
    }

    rowDetailsObj = this.createObj();
    return rowDetailsObj;
  }

  onSubmit() {

    let rowDetailsObj = this.createObjToSend();

    this.rowToEdit = [];

    rowDetailsObj["id"] = this.onEditMode ? this.id : null;
    this.tableService.addRow(rowDetailsObj);
    this.signupForm.reset();
    this.tableService.onSaveData();
    this.modalService.openModal(this.modalService.getPrevModal(), "xl");
  }

  createObj() {
    for (var i = 0; i < this.cols.length; ++i) {
      this.rowDetails[this.cols[i]] = this.signupForm.value[this.cols[i]];
    }

    return this.rowDetails;
  }

  onClearForm() {
    this.signupForm.reset();
  }
}
