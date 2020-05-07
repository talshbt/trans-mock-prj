
import { Component,  OnInit } from '@angular/core';
import { TreeDataStorageService } from "./shared/tree-data-storage.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private treeDataStorageService:TreeDataStorageService,
  
   ){}
  ngOnInit(): void {
  }

  // openModal() {
  //   this.tableService.initCols();
  //   this.modalService.openModal(TableComponent, "xl");
  // }
}