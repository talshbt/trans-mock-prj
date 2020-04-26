import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ViewContainerRef, Component, Injector, ComponentFactoryResolver, ComponentRef, ReflectiveInjector, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { TransInputComponent } from './trans-input/trans-input.component';
import { TransTreeViewComponent } from './trans-tree-view/trans-tree-view.component';
import { AppService } from './shared/app.service';
import { TableTransMockupComponent } from './table-trans-mockup/table-trans-mockup.component';
import { TableComponent } from './table-trans-mockup/table/table.component';
import { RowComponent } from './table-trans-mockup/table/row/row.component';
import { AddItemComponent } from './table-trans-mockup/add-item/add-item.component';
import { NgModalComponent } from './table-trans-mockup/ng-modal/ng-modal.component';
import { FilterPipe } from './shared/filter.pipe';
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

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
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [TransTreeViewComponent,NgModalComponent, AddItemComponent, TableComponent],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
