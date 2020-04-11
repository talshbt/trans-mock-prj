import { Injectable } from '@angular/core';
import {
  Component,
} from "@angular/core";
import { TableService } from "../shared/table.service";
import { NgModalComponent } from "../ng-modal/ng-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private _NgbModal: NgbModal,
    private tableService: TableService
) { }

  openModal(component) {
    this.tableService.setComponentName(component)
    this.tableService.onSaveData();
    // this.tableService.setComponentName("add-new-item");
    
    this._NgbModal.open(NgModalComponent, {
      windowClass: "modal-job-scrollable",
      size: 'sm', 
      backdrop: 'static',
      centered:true
      // windowClass: 'modal-xl'
      
      
    });

    // upwrap the "app-ng-modal" data to enable the "modal-dialog-scrollable"
    // and make the modal scrollable
    (() => {
      const node: HTMLElement | null = document.querySelector("app-ng-modal");
      if (node) {
        while (node.firstChild) {
          (node.parentNode as HTMLElement).insertBefore(node.firstChild, node);
        }
      }
      // make the modal scrollable by adding the class .modal-dialog-scrollable
      // here wait for one second so that we can find the .modal-dialog
      setTimeout(() => {
        const modalDialog = document.querySelector(
          ".modal-job-scrollable .modal-dialog"
        );
        if (modalDialog) {
          modalDialog.classList.add("modal-dialog-scrollable");
        }
      }, 1000);
    })();
    this.tableService.setComponentName(null)

  }


}