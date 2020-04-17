import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnDestroy,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TableService } from "../shared/table.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-ng-modal",
  templateUrl: "./ng-modal.component.html",
  styleUrls: ["./ng-modal.component.scss"],
})
export class NgModalComponent implements OnInit, OnDestroy {
  sub: Subscription;
  componentToRender = null;
  countModals = 0;
  isNewItemClosed = false;
  @ViewChild("container", { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private tableService: TableService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  get activeModal() {
    return this._NgbActiveModal;
  }
  ngOnInit() {
    this.sub = this.tableService.saveData.subscribe(() => {
      this.activeModal.close("Close click");
      this.isNewItemClosed = true;
    });

    this.componentToRender = this.tableService.getComponentName();
    this.add();
  }

  add(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.componentToRender
    );

    const componentRef = this.container.createComponent(componentFactory);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
