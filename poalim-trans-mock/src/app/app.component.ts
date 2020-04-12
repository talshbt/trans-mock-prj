import { Component } from '@angular/core';
import { NgModalComponent } from './ng-modal/ng-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './shared/modal.service';
import { TableComponent } from './table/table.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  // private fieldArray: Array<any> = ["id","name","email"];



  constructor(private modalService: ModalService) {
    
  }

  // async ngOnInit() {
    
  // }

  // async add() {
  //   console.log(await this.modalService.open(TableComponent));
  // }

  openModal() {
     this.modalService.openModal(TableComponent, 'lg');
  }

}



