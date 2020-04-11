import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { TableComponent } from './table/table.component';
import { NgModalComponent } from './ng-modal/ng-modal.component';
import { FilterPipe } from './shared/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddNewItemComponent,
    TableComponent,
    NgModalComponent,
    FilterPipe,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModalModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [NgModalComponent, AddNewItemComponent, TableComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
