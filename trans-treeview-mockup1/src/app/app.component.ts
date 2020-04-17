import { RestApiService } from "./rest-api.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransService } from "./shared/trans.service";
import { TransDetails } from "./shared/trans-details.model";
import { ViewContainerRef, Component, Injector, ComponentFactoryResolver, ComponentRef, ReflectiveInjector,  OnInit } from '@angular/core';
import { TransTreeViewComponent } from './trans-tree-view/trans-tree-view.component';
import { DataStorageService } from "./data-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private dataStorage:DataStorageService){}
  ngOnInit(): void {
    // this.dataStorage.getTree('name').toPromise().then(data => {

    //   console.log(data)

    // })

  
  }
  // constructor(private cfr: ComponentFactoryResolver,
  //   private vc: ViewContainerRef) {

  //   const injector: Injector = ReflectiveInjector.resolveAndCreate([
  //     {
  //       provide: 'config',
  //       useValue: {
  //         value: 'Any value or object here'
  //       }
  //     }
  //   ]);
  //   const factory = cfr.resolveComponentFactory(TransTreeViewComponent);
  //   const cr: ComponentRef<TransTreeViewComponent> = vc.createComponent(factory, 0, injector);
  //   console.log(cr.instance.config);
  // }
  // name = 'Angular';
  
}
// $midnight: #2c3e50;
// $clouds: #ecf0f1;
// body {
//   color: $midnight;
//   background: $clouds;
//   padding: 0 1em 1em;
// }
// h1 {
//   margin: 0;
//   line-height: 2;
//   text-align: center;
// }
// h2 {
//   margin: 0 0 .5em;
//   font-weight: normal;
// }
// input {
//   position: absolute;
//   opacity: 0;
//   z-index: -1;
// }
// .row {
//   display:flex;
//   .col {
//     flex:1;
//     &:last-child {
//       margin-left: 1em;
//     }
//   }
// }
// .tabs {
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 4px 4px -2px rgba(0,0,0,0.5);
// }
// .tab {
//   width: 100%;
//   color: white;
//   overflow: hidden;
//   &-label {
//     display: flex;
//     justify-content: space-between;
//     padding: 1em;
//     background: $midnight;
//     font-weight: bold;
//     cursor: pointer;
//     /* Icon */
//     &:hover {
//       background: darken($midnight, 10%);
//     }
//     &::after {
//       content: "\276F";
//       width: 1em;
//       height: 1em;
//       text-align: center;
//       transition: all .35s;
//     }
//   }
//   &-content {
//     max-height: 0;
//     padding: 0 1em;
//     color: $midnight;
//     background: white;
//     transition: all .35s;
//   }
//   &-close {
//     display: flex;
//     justify-content: flex-end;
//     padding: 1em;
//     font-size: 0.75em;
//     background: $midnight;
//     cursor: pointer;
//     &:hover {
//       background: darken($midnight, 10%);
//     }
//   }
// }

// input:checked {
//   + .tab-label {
//     background: darken($midnight, 10%);
//     &::after {
//       transform: rotate(90deg);
//     }
//   }
//   ~ .tab-content {
//     max-height: 100vh;
//     padding: 1em;
//   }
// }
