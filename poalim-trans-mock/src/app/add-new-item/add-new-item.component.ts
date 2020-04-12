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
    rowDetails = { };
    onEditMode = false;


  constructor( private tableService: TableService,  private modalService: ModalService, private postService: PostService) { 
    
  }

  ngOnInit() {
   
    this.cols = this.tableService.getCols();
    this.onEditMode = this.tableService.isEditMode();
    this.rowToEdit = this.tableService.isEditMode()? this.tableService.getRowToEdit(): [];
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
     

  let rowDetailsObj = this.createObjToSend();
  
  this.rowToEdit = [];
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


