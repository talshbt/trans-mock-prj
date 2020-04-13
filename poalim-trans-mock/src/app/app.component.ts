import { Component, OnInit } from '@angular/core';
import { NgModalComponent } from './ng-modal/ng-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './shared/modal.service';
import { TableComponent } from './table/table.component';
import { PostService } from './shared/post.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  // private fieldArray: Array<any> = ["id","name","email"];



  constructor(private modalService: ModalService, private postService :PostService) {
    
  }

  // async ngOnInit() {
    
  // }

  // async add() {
  //   console.log(await this.modalService.open(TableComponent));
  // }

  openModal() {
     this.modalService.openModal(TableComponent, 'lg');
  }

  ngOnInit(){
    // this.postService.getAll()
    // .subscribe(
    //   data => {
    //     // this.tutorials = data;
    //     console.log(data);
    //   },
    //   error => {
    //     console.log(error);
    //   });
    //  console.log(this.cols);
  }

}



