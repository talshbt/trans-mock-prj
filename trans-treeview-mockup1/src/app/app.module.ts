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

@NgModule({
  declarations: [
    AppComponent,
    TransInputComponent,
    TransTreeViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [TransTreeViewComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
