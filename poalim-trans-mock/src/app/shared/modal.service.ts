import { Injectable } from '@angular/core';
import {
  Component,
} from "@angular/core";
import { TableService } from "../shared/table.service";
import { NgModalComponent } from "../ng-modal/ng-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  onClose = new Subject<any>();
  isPrevModal = false;
  prevModal = null;
   constructor(private _NgbModal: NgbModal,
    private tableService: TableService
) { }


openModal(component, size) {
    this.setPrevModal(component)
    ;
    this.tableService.setComponentName(component)

    
    this._NgbModal.open(NgModalComponent, {
      windowClass: "modal-job-scrollable",
      size: size, 
      backdrop: 'static',
      centered:true,
     
      
      
      
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

    
  }




  setPrevModal(component){
     if (this.prevModal == null){
        this.isPrevModal = true;
        this.prevModal = component
    }
  }

  getPrevModal(){
    return this.prevModal;
  }

}



