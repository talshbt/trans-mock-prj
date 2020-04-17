import { Component, OnInit } from "@angular/core";
import { ModalService } from "./shared/modal.service";
import { TableComponent } from "./table/table.component";
import { PostService } from "./shared/post.service";
import { TableService } from "./shared/table.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private postService: PostService,
    private tableService: TableService
  ) {}

  openModal() {
    this.tableService.initCols();
    this.modalService.openModal(TableComponent, "lg");
  }

  ngOnInit() {}
}
