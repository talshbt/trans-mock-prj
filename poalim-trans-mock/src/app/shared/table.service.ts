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
  // modalOpened = new Subject<any>();
  // dataChanged = new Subject<any>();
  dataChanged2 = new Subject<any>();
  saveData = new Subject<any>();
  rowIndex = 0;
  rowToEdit = [];
  rowToEdit2 = {};

  onEditMode = false;
  rowIndexToEdit = null;

  private cols = [];
  private rows2 = [];

  componentToRender = null;


   getRows = () => {
   // need to replace the code after the post service
    
    this.postService.getRows().toPromise().
    then(response => {
        // console.log("getRows",response)
        this.rows2 = response;  
        

      }).then(data => this.dataChanged2.next(this.rows2));

  }
  constructor(private postService:PostService) {}


  addRow(row) {
    let x = this.getRows;
     this.postService.postNewRow(row).toPromise()
     .then(function(res){
      //  console.log(res)
      x();
     }).catch(e=>console.error(e));
     ;

  }

  getCols() {
    
    this.postService.getCols1().toPromise().
    then(response => {
      this.getRows();
      });

      //need to remove
    this.cols = this.postService.getCols();
    return this.cols;
  }

  onSaveData() {
    
    if(this.componentToRender.name == "AddNewItemComponent"){
     this.saveData.next();
    }

    
  }

  deleteRow(indexRow) {

    var rowToRemove = this.rows2[indexRow];
    // console.log(rowToRemove)
    this.postService.removeRow(rowToRemove).toPromise()
    .then(response => {
      this.getRows();
    })
    .catch(e=>console.error(e));


    // this.rows2.splice(indexRow, 1);
    // this.dataChanged.next(this.rows2.slice());
  }

  editRow(row) {
    
    // console.log(this.rows2[indexRow])
    let indexId = row.id;
    let currentRow = this.rows2.filter( row => row.id ===  indexId);
     this.rowToEdit2 = currentRow[0];
    let indexRow = this.rows2.indexOf(this.rowToEdit2)
    // console.dir(this.rowToEdit2[0]);
    
    
    this.onEditMode = true;
    this.rowIndexToEdit = indexRow;
    // var rowDetails = [];
    for (var i = 0; i < this.cols.length; ++i) {
      this.rowToEdit.push(this.rows2[indexRow][this.cols[i]]);
    }
  }

  setRowToEdit(row){
    this.rowToEdit 
     = row
  }

  getRowToEdit() {
    if (this.onEditMode) {
      return this.rowToEdit;
    } else {
      return [];
    }
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



