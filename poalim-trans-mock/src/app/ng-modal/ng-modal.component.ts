import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {TableService} from '../shared/table.service'
import { Subscription } from "rxjs";
import { AddNewItemComponent } from '../add-new-item/add-new-item.component';

@Component({
  selector: 'app-ng-modal',
  templateUrl: './ng-modal.component.html',
  styleUrls: ['./ng-modal.component.scss']
})
export class NgModalComponent implements OnInit {
  sub: Subscription;
  componentName = null;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

constructor(
    private _NgbActiveModal: NgbActiveModal, private tableService: TableService, private componentFactoryResolver: ComponentFactoryResolver
  ) {


    
   }

  get activeModal() {
    return this._NgbActiveModal;
  }
  ngOnInit() {
       this.sub = this.tableService.saveData.subscribe(
       () => {
        //  console.log("in modal componenet")
        //   console.log(str)
         this.activeModal.close('Close click');

      }
     )

     this.componentName = this.tableService.componentName;
     console.log(this.tableService.getComponentName())
     var name =  this.tableService.getComponentName();
    this.add(name);
     
  }

    add(component): void {
    var componentToRender = component;
    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.tableService.getComponentName());

    // add the component to the view
    const componentRef = this.container.createComponent(componentFactory);

    // pass some data to the component
    // componentRef.instance.index = this._counter++;
  }


}