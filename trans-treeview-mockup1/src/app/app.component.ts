import { RestApiService } from "./rest-api.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransDetails } from "./shared/trans-details.model";
import { ViewContainerRef, Component, Injector, ComponentFactoryResolver, ComponentRef, ReflectiveInjector,  OnInit } from '@angular/core';
import { TransTreeViewComponent } from './trans-tree-view/trans-tree-view.component';
import { DataStorageService } from "./data-storage.service";
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

  constructor(private dataStorage:DataStorageService,
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