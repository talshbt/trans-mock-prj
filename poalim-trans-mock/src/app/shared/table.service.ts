import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { ModalService } from './modal.service';
import { PostService } from './post.service';

import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class TableService {

  dataChanged2 = new Subject<any>();
  saveData = new Subject<any>();
  rowIndex = 0;
  currentRow = {};

  private onEditMode = false;

  private cols = [];
  private rows = [];

  componentToRender = null;


   getRows = () => {
    
    this.postService.getRows().toPromise().
    then(response => {
        this.rows = response;  
        
      }).then(data => this.dataChanged2.next(this.rows));

  }
  constructor(private postService:PostService) {}


  addRow(row) {
    let x = this.getRows;
     this.postService.postNewRow(row).toPromise()
     .then(function(res){
      x();
     }).catch(e=>console.error(e));
     ;

  }

  getCols() {
    
    this.cols = this.postService.getCols();
    return this.cols;
  }

  onSaveData() {
    
    if(this.componentToRender.name == "AddNewItemComponent"){
     this.saveData.next();
    }

    
  }

  deleteRow(row) {
    let indexId = row.id;
    let currentRow = this.rows.filter( row => row.id ===  indexId);
    var rowToRemove = currentRow[0];
    this.postService.removeRow(rowToRemove).toPromise()
    .then(response => {
      this.getRows();
    })
    .catch(e=>console.error(e));

  }

  editRow(row) {
    
    let indexId = row.id;
    let currentRow = this.rows.filter( row => row.id ===  indexId);
    this.currentRow = currentRow[0];
    let indexRow = this.rows.indexOf(this.currentRow)
  
    this.onEditMode = true;
  
  }

  isEditMode() {
    return this.onEditMode;
  }

  setComponentName(name){
    this.componentToRender = name;

    
  }

  getComponentName(){
    return this.componentToRender;
  }




  
}



