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
    gotColsSub: Subscription;

     rowToEdit2 = {}
     rowValues = [];
     id = null;

  constructor( private tableService: TableService,  private modalService: ModalService, private postService: PostService) { 
    
  }

  ngOnInit() {
    // this.tableService.initTable();
    this.gotColsSub = this.tableService.gotCols.subscribe(cols => {
      console.log("get cols")
   
      this.cols = cols;
      this.newCols = this.cols.slice(1,this.cols.length)
      console.log(this.newCols)
    });
    // this.newCols = this.cols.slice(1,this.cols.length)
    this.onEditMode = this.tableService.isEditMode();

    if(this.tableService.isEditMode()){
      this.rowToEdit2 = this.tableService.currentRow;
      this.id = this.rowToEdit2['id']
      this.rowValues = Object.values(this.rowToEdit2)
      this.rowToEdit = this.rowValues.slice(1,this.rowValues.length)

    }else{
      this.rowToEdit2 = {}
    }

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
      this.tableService.addRow(rowDetailsObj);
      this.signupForm.reset();
      this.tableService.onSaveData();
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


