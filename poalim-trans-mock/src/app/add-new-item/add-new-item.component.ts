import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import {TableService} from '../shared/table.service'
import {ModalService} from '../shared/modal.service'
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.scss']
})
export class AddNewItemComponent implements OnInit{
  
    rowToEdit = [];
   @ViewChild("f") signupForm: NgForm;
    cols = [];
    newCols = [];
    rowDetails = { };
    onEditMode = false;
    sub: Subscription;
     rowToEdit2 = {}
     rowToEdit2Arr = [];
     id = null;

  constructor( private tableService: TableService,  private modalService: ModalService, private postService: PostService) { 
    
  }

  ngOnInit() {
  

    // this.tableService.editRow2()
    
  
    this.cols = this.tableService.getCols();
    // console.log(this.cols)
    this.newCols = this.cols.slice(1,this.cols.length)
    this.onEditMode = this.tableService.isEditMode();
    this.rowToEdit = this.tableService.isEditMode()? this.tableService.getRowToEdit(): [];

    if(this.tableService.isEditMode()){
      this.rowToEdit2 = this.tableService.rowToEdit2;
      this.id = this.rowToEdit2['id']
      this.rowToEdit2Arr = Object.values(this.rowToEdit2)
      this.rowToEdit = this.rowToEdit2Arr.slice(1,this.rowToEdit2Arr.length)
      console.log(this.rowToEdit)

    }else{
      this.rowToEdit2 = {}
    }
    //  this.rowToEdit2 = this.tableService.isEditMode()? this.tableService.rowToEdit2: {};

    // console.log(this.rowToEdit2)
  }


  private createObjToSend(){

    
    let rowDetails = [];
    
    let rowDetailsObj = {};
      for(var i = 0 ; i < this.cols.length; ++i){
        rowDetails.push(this.signupForm.value[this.cols[i]]);

      }


  rowDetailsObj = this.createObj();
  return rowDetailsObj;
  }

  onSubmit() {
      // console.log(this.onEditMode)

      let rowDetailsObj = this.createObjToSend();
  
      this.rowToEdit = [];

      rowDetailsObj['id'] = this.onEditMode ? this.id : null;
      // rowDetailsObj['id'] = null; 
      this.tableService.addRow(rowDetailsObj);
      this.signupForm.reset();
      this.tableService.onSaveData();
  //  this.tableService.closeModal();
      this.modalService.openModal(this.modalService.getPrevModal(), 'xl')

       
  }


  createObj(){    
      for(var i = 0 ; i < this.cols.length; ++i){
        this.rowDetails[this.cols[i]] = this.signupForm.value[this.cols[i]];
      }

      
      return this.rowDetails;
  }

  onClearForm(){
   this.signupForm.reset();  }




 

   

}


