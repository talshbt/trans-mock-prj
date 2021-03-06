import { ViewContainerRef, Component, Injector, ComponentFactoryResolver, ComponentRef, ReflectiveInjector, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { TreeTransMockupService } from "../shared/tree-trans-mockup.service";
import { TransDetails } from "../shared/trans-details.model";
import { TransTreeViewComponent } from '../trans-tree-view/trans-tree-view.component';
import { Subject } from "rxjs";

@Component({
  selector: 'app-trans-input',
  templateUrl: './trans-input.component.html',
  styleUrls: ['./trans-input.component.css']
})

export class TransInputComponent {
  isSubmitted = false;

  constructor(private treeTransMockupService: TreeTransMockupService, private cfr: ComponentFactoryResolver,
    private vc: ViewContainerRef) {
  }

  onSubmit(form: NgForm) {

    const transDetails = this.setTransDetails(form);

    // console.log(form.value.transName)
    this.handleTreeComponent(transDetails);
    // this.treeTransMockupService.getTreeFromDb(form.value.transName)
    this.treeTransMockupService.getTreeFromDb(form.value.transName)
    // this.treeTransMockupService.getCurrentTreeFromDb(form.value.transName)

    form.reset();
  }

  handleTreeComponent(transDetails) {

    this.isSubmitted = true;
    this.treeTransMockupService.sendDetailsToTreeView(transDetails);

  }

  setTransDetails(form) {
    const transName = form.value.transName;
    const tatSherutName = form.value.tatSherutName;

    const transDetails: TransDetails = {
      transName: transName,
      tatSherutName: tatSherutName,
    };

    return transDetails;
  }


  //unused
  renderTreeComponent() {
    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'config',
        useValue: {
          value: 'Any value or object here'
        }
      }
    ]);
    const factory = this.cfr.resolveComponentFactory(TransTreeViewComponent);
    const cr: ComponentRef<TransTreeViewComponent> = this.vc.createComponent(factory, 0, injector);
    // console.log(cr.instance.config);
  }


} 
