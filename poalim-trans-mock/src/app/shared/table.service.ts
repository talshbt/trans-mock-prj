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

  rowToEdit = [];
  onEditMode = false;
  rowIndexToEdit = null;
  // componentToOpen =  new Subject<any>();
  // componentName = null;
  private cols = [];
  private rowsDetailsArr = [];
  componentToRender = null;


  getRows(){
   // need to replace the code after the post service

    this.postService.getRows().toPromise().
    then(response => {
      console.log("response get all")
       console.log(response)
        // this.rows = response;
        // return res;    
      });

      //need to remove
    return this.rowsDetailsArr.slice();
  }
  constructor(private postService:PostService) {}


  addRow(row) {
    if (this.onEditMode) {
      this.rowsDetailsArr[this.rowIndexToEdit] = row;
      this.onEditMode = false;
    } else {
      this.rowsDetailsArr.push(row);
      this.postService.postNewRow(row)
      // console.log(row)
    }
    // this.postService.postNewRow(row)
    
    this.dataChanged.next(this.rowsDetailsArr.slice());
   
    
  }

  getCols() {
    
    this.postService.getCols1().toPromise().
    then(response => {
       console.log(response)
       
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
    this.rowsDetailsArr.splice(indexRow, 1);
    this.dataChanged.next(this.rowsDetailsArr.slice());
  }

  editRow(indexRow) {
    this.onEditMode = true;
    this.rowIndexToEdit = indexRow;
    var rowDetails = [];
    for (var i = 0; i < this.cols.length; ++i) {
      this.rowToEdit.push(this.rowsDetailsArr[indexRow][this.cols[i]]);
    }
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



