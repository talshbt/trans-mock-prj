import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TransInputComponent } from './trans-input/trans-input.component';
import { TransTreeViewComponent } from './trans-tree-view/trans-tree-view.component';
import { TableTransMockupComponent } from './table-trans-mockup/table-trans-mockup.component';
import { TableComponent } from './table-trans-mockup/table/table.component';
import { RowComponent } from './table-trans-mockup/table/row/row.component';
import { AddItemComponent } from './table-trans-mockup/add-item/add-item.component';
import { NgModalComponent } from './table-trans-mockup/ng-modal/ng-modal.component';
import { FilterPipe } from './shared/filter.pipe';
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { ParentTableComponent } from './parent-table/parent-table.component';
import { AddNewItemComponent } from './parent-table/add-new-item/add-new-item.component';
import { NgModalTableComponent } from './parent-table/ng-modal-table/ng-modal-table.component';
import { TableTransComponent } from './parent-table/table-trans/table-trans.component';
import { RowTransComponent } from './parent-table/table-trans/row-trans/row-trans.component';

@NgModule({
  declarations: [
    AppComponent,
    TransInputComponent,
    TransTreeViewComponent,
    TableTransMockupComponent,
    TableComponent,
    RowComponent,
    AddItemComponent,
    NgModalComponent,
    FilterPipe,
    ParentTableComponent,
    AddNewItemComponent,
    NgModalTableComponent,
    TableTransComponent,
    RowTransComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [NgModalTableComponent, AddNewItemComponent, NgModalComponent, AddNewItemComponent, TableComponent, TransTreeViewComponent, NgModalComponent, AddItemComponent, TableComponent, TableTransComponent],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
