import {
  Component,
  OnInit,
  OnDestroy
} from "@angular/core";
import { TableService } from "../shared/table.service";
import { AddNewItemComponent } from "../add-new-item/add-new-item.component";
import { Subscription } from "rxjs";
import { ModalService } from '../shared/modal.service';
import { PostService } from '../shared/post.service';

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
  modalClothed;

  constructor(
   
    private tableService: TableService,
    private modalService :ModalService,
    private postService :PostService
  ) {}

  ngOnInit() {
 
    this.sub = this.tableService.dataChanged.subscribe(rowDetailsArr => {
      this.rowDetailsArr = rowDetailsArr;
    });

    this.cols = this.tableService.getCols();
    
    this.postService.getRows()
    .toPromise()
    .then(res => this.rowDetailsArr = res)
  
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openModal() {
    this.modalService.openModal(AddNewItemComponent, 'sm');
       
  }

  onDeleteRow(rowIndex) {
    this.tableService.deleteRow(rowIndex);
  }
 
 }




