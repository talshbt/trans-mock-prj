import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  rowChanged = new Subject<any>();
  saveData = new Subject<any>();
  rowToEdit = [];
  onEditMode = false;
  rowIndexToEdit = null;
  componentToOpen =  new Subject<any>();
  componentName = null;
  private cols = [];
  private rowsDetailsArr = [];
  componentToRender = null;



  constructor(private postService: PostService) {}

  



  addRow(row) {
    if (this.onEditMode) {
      this.rowsDetailsArr[this.rowIndexToEdit] = row;
      this.onEditMode = false;
    } else {
      this.rowsDetailsArr.push(row);
    }

    this.rowChanged.next(this.rowsDetailsArr.slice());
  }

  getCols() {
    this.cols = this.postService.getCols();

    return this.cols;
  }

  onSaveData() {
    this.componentName = this.getComponentName();
    console.log(name);
    this.saveData.next(name);
  }

  deleteRow(indexRow) {
    this.rowsDetailsArr.splice(indexRow, 1);
    this.rowChanged.next(this.rowsDetailsArr.slice());
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
    console.log(name)
    if(this.componentToRender == null){
      this.componentToRender = name;
    }
    
  }

  getComponentName(){
    return this.componentToRender;
  }

  

  
}
