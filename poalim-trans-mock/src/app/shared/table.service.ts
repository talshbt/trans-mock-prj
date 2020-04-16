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
  dataChanged = new Subject<any>();
  saveData = new Subject<any>();
  rowEditTemp = new Subject<any>();
  rowIndex = 0;
  rowToEdit = [];
  rowToEdit2 = {};

  onEditMode = false;
  rowIndexToEdit = null;
  // componentToOpen =  new Subject<any>();
  // componentName = null;
  private cols = [];
  private rows = [];
  private rows2 = [];

  componentToRender = null;


  getRows(){
   // need to replace the code after the post service
    
    this.postService.getRows().toPromise().
    then(response => {
      // console.log("response get all")
        console.log(response)
        this.rows2 = response;
        // this.rows = response;
        // return res;    
      });

      //need to remove
    return this.rows.slice();
  }
  constructor(private postService:PostService) {}


  addRow(row) {
    if (this.onEditMode) {
      this.rows[this.rowIndexToEdit] = row;
      this.onEditMode = false;
      this.postService.editRow(row, this.rowIndexToEdit)
    } else {
      this.rows.push(row);
      // this.postService.postNewRow(row)
      //  console.log(row)
    }

    this.postService.postNewRow(row)
    // this.postService.postNewRow(row)
    
    this.dataChanged.next(this.rows.slice());
   
    
  }

  getCols() {
    
    this.postService.getCols1().toPromise().
    then(response => {
      //  console.log(response)
       
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
    console.log(rowToRemove)
    this.postService.removeRow(rowToRemove).toPromise()
    .then(response => {
      // this.rows = response;
      // this.rows = response;
      // console.log("after remove index " + indexRow)
      // console.log(response);
      // return res;    
    })
    .catch(e=>console.error(e));


    this.rows.splice(indexRow, 1);
    this.dataChanged.next(this.rows.slice());
  }

  editRow(indexRow) {
    
    console.log(this.rows2[indexRow])
    this.rowToEdit2 = this.rows2[indexRow];
    this.onEditMode = true;
    this.rowIndexToEdit = indexRow;
    // var rowDetails = [];
    for (var i = 0; i < this.cols.length; ++i) {
      this.rowToEdit.push(this.rows[indexRow][this.cols[i]]);
    }
  }


  editRow2(){

    var res = null;
    if(this.rowIndexToEdit !== null){
      
      this.postService.editRow2(this.rowIndexToEdit)
     .toPromise()
     .then(response => {
       res = response;

      //  this.setRowToEdit(response)

     }
     )
     .catch(e=>console.error(e));
    }

    // console.log("ress")
   
   
  }

  setRowToEdit(row){
    // console.log("in set row to edit")
    this.rowToEdit 
     = row
    // console.log(this.rowToEdit)
  }

  getRowToEdit() {
    if (this.onEditMode) {
      // console.log(this.rowToEdit)
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



