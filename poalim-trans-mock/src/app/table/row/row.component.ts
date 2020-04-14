import { Component, OnInit, Input} from '@angular/core';
import { TableService } from "../../shared/table.service";
import { ModalService } from '../../shared/modal.service';
import { AddNewItemComponent } from "../../add-new-item/add-new-item.component";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {
  @Input()row :any;
  @Input()rowIndex :number;
  constructor(private tableService : TableService, private modalService: ModalService) { }

  ngOnInit() {
  }

  onDeleteRow() {
    this.tableService.deleteRow(this.rowIndex);
  }

  editRow() {
    console.log("edit row of row cvompoennt")

    this.tableService.editRow(this.rowIndex);
    // this.tableService.editRow2();

    this.modalService.openModal(AddNewItemComponent, 'sm');
  }

}



