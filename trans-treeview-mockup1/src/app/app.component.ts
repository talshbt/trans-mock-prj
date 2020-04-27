
import { Component,  OnInit } from '@angular/core';
import { TreeDataStorageService } from "./shared/tree-data-storage.service";
import { ModalService } from "./shared/modal.service";
import { TableComponent } from './table-trans-mockup/table/table.component';
import { TableDataStorageService } from "./shared/table-data-storage.service";
import { TableTransMockupService } from "./shared/table-trans-mockup.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private treeDataStorageService:TreeDataStorageService,
    private modalService: ModalService,
    private postService: TableDataStorageService,
    private tableService: TableTransMockupService){}
  ngOnInit(): void {
  }

  openModal() {
    this.tableService.initCols();
    this.modalService.openModal(TableComponent, "lg");
  }
}