import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RestApiService } from "../rest-api.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransService } from "../shared/trans.service";
import { TransDetails } from "../shared/trans-details.model";
import { NgForm, FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-trans-tree-view',
  templateUrl: './trans-tree-view.component.html',
  styleUrls: ['./trans-tree-view.component.scss']
})
export class TransTreeViewComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  // myForm: FormGroup;
  public transForm ;
  form;

  title = 'an-mockup-trans0';
  count = 0;
  transTree = {};
  transName = null;
 
  tatSherutName = null;
  // store the data for form
  treeMainDs = [];
  constructor( public restApi: RestApiService, private transService: TransService) {
  
  }
  ngOnInit() {
    this.subscription = this.transService.detailsChanged.subscribe(
      data => {
        this.transName = data.transName;
        this.tatSherutName = data.tatSherutName;

        this.transService.getTreeEvent.subscribe(tree=>{
          this.transTree = tree;
          this.createTreeMainDs();
          this.fillFormWithTreeDsData();

          console.log(this.treeMainDs)
          console.log(this.form)
          this.setFormArray()
    
        })


      }
    );





    this.transService.getTreeEvent.subscribe(tree=>{
      this.transTree = tree;
    })



  }

  onSubmit() {
    // alert(this.myForm.value);
  }
  getHttpReq() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  // setParents(){
  //   let control = <FormArray>this.myForm.controls.cities;
  //   // this.data.cities.forEach(x => {
  //   //   control.push(this.fb.group({ 
  //   //     city: x.city, 
  //   //     addressLines: this.setAddressLines(x) }))
  //   // })
  // }
  hasChildren(parent){
    return parent.length > 0
  }



  createObj(parent){
       var group = { };

     for (var i in this.transTree[parent]){
              
             group[this.transTree[parent][i]] = new FormControl('', {validators: Validators.required});
    
            }


            return group;
  }

  setFormArray(){
    let storeGroup = [];

              for (var p in this.transTree) {
    
             if(this.hasChildren(this.transTree[p])){


               let group  = this.createObj(p)


                storeGroup.push(new FormGroup(group))

       
             }

             this.transForm = new FormArray(storeGroup);

          
             
  }


  
  
  
}

createTreeMainDs() {

  for (var parent in this.transTree) {
    var formArr = [];
    var parentObj = {};
    parentObj["name"] = parent;
    if (!this.hasChild(parent)) {
      formArr.push(new FormControl(parent));
      parentObj["hasChild"] = false;
    } else {
      var children = [];
      var childObj = {};
      parentObj["hasChild"] = true;
      for (var child in this.transTree[parent]) {
        formArr.push(new FormControl(this.transTree[parent][child]));
        childObj[this.transTree[parent][child]] = this.transTree[parent][
          child
        ];
        children.push(this.transTree[parent][child]);
      }
      parentObj["children"] = children;
      parentObj["childObj"] = childObj;
    }

    this.treeMainDs.push(parentObj);
  }
 

}



hasChild(parent) {
  return this.transTree[parent].length > 0;
}

createFormTemplate() {
  var templateFormobj = {};
  for (var parent of this.treeMainDs) {
    templateFormobj[parent.name] = new FormArray([]);
  }
  this.form = new FormGroup(templateFormobj);

  
}

fillFormWithTreeDsData() {
  this.createFormTemplate();
  for (var parent in this.treeMainDs) {
    var controlObj = this.createControlObj(parent)

    let formGroup = this.addControlToFormControl(controlObj)

    var formArrayOfControls = this.getFormArray(parent)

    formArrayOfControls.push(new FormGroup(formGroup));
  }

 


}


createControlObj(parent){
  var controlObj = {};
      if (!this.treeMainDs[parent]["hasChild"]) {
        controlObj[this.treeMainDs[parent]["name"]] = this.treeMainDs[parent][
          "name"
        ];
      } else {
        var children = this.treeMainDs[parent]["children"];

        for (var child in children) {
          controlObj[children[child]] = children[child];
        }
      }

    return controlObj;
}

addControlToFormControl(controlObj){
  let formGroup: any = {};


      for (let control in controlObj) {
        formGroup[control] = new FormControl(controlObj[control]);
      }


      return formGroup;
}


getFormArray(parent){
  var controlName = this.treeMainDs[parent]["name"];
  return this.form.get(controlName) as FormArray;
}


}



// ngOnInit(){
//     this.subscription =  this.transService.detailsChanged.subscribe(
//           data => 
//           {
//             this.transName = data.transName;
//             this.tatSherutName = data.tatSherutName;


//             this.restApi.getArr(this.transName, null).subscribe((data: {}) => {
//             this.arr = data;
//         })


//           }
//         );




//     this.restApi.getArr(this.transName, null).subscribe((data: {}) => {

//       //console.log(data);
//       this.arr = data;
//       // console.log(this.arr)

//       // for (var p in this.arr) {
//       //   console.log("parent ="+ p)
//       //   console.log("len = " + this.arr[p].length);
//       //   for (var i in this.arr[p]){

//       //     console.log("child = "  + this.arr[p][i])

//       //   }
//       // }
//     })



//   }