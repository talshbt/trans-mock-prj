const bodyParser = require('body-parser');
const express = require('express')
const fetch = require('node-fetch');
const xml2js = require('xml2js');

var fs = require('fs').promises
const PORT = process.env.PORT || 7777;
const app = express();
var parser = new xml2js.Parser();


/***************************************/
//for luAnc1ServerData
var transTree = {};
var storeTemplateTree = {};
var currentTree = null;
var transDict = {};
var isInitTree = true;

var parent;
// var fieldName = 'luAnc1ServerData';
var treeObj;
/***************************************/


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

  app.listen(PORT, function(){
  console.log(`App running on localhost:${PORT}`);
  

  
});



  app.post("/getTree/", function(req, res) {

    res.setHeader('Content-Type', 'application/json');

      var fieldName = req.body.fieldName;
      console.log(isInitTree)
      
      parseXml(fieldName,transTree).
      then(tree => {
          createTransDict(transTree)
          res.json(transDict)
      
        

        //  console.log("transDict")

        //  console.log(currentTree)
        // res.json(transDict)   
      })
      .catch(e=>res.json({"Error":"got Error from parseXML","Exception":e}));
    
        
      

  });


  app.post("/getCurrentTree/", function(req, res) {

    res.setHeader('Content-Type', 'application/json');

    var fieldName = req.body.fieldName;
    console.log(isInitTree)
    
    parseXml(fieldName,transTree).
    then(tree => {
        // createTransDict(transTree)
        res.json(currentTree)
    
      

      //  console.log("transDict")

      //  console.log(currentTree)
      // res.json(transDict)   
    })
    .catch(e=>res.json({"Error":"got Error from parseXML","Exception":e}));
      

  });




  app.post("/postTree/", function(req, res) {
    var obj = {}
    res.setHeader('Content-Type', 'application/json');

      var tree = req.body.tree;
      currentTree = tree;
      // console.log(currentTree)
      var arrOfDictChild = currentTree["anqnlc1wnigreretData"];
      console.log(Object.keys(arrOfDictChild[0]).length)

      // var arrOfDictChildEx = transDict[parent];

      for (var parent in currentTree) {


        var key = parent;
        console.log("parent:" + parent )
        var arrOfDictChild = currentTree[parent][0];
        var arrOfKeys = Object.keys(arrOfDictChild);
        var values = [];

      // console.log(arrOfKeys)
      for(var x  of arrOfKeys){
        var childObj = {};
        console.log(arrOfDictChild[x])
        // console.log(x)
        childObj[x] = arrOfDictChild[x];
        values.push(childObj)
      }

      transDict[key] = values;

        // console.log("-----------")
   
      
    }


    console.log(transDict)


    
     
  });

  function createTransDict(transTree) {
    isInitTree = false
    for (var parent in transTree) {
      var key = parent;
      var values = [];
      if(!hasChildren(parent, transTree)){
        var parentObj = {}
        parentObj[key] = ""
        values.push(parentObj)
        transDict[key] = values;
      }else{

      for (var child in transTree[parent]) {
        var childObj = {};
        childObj[transTree[parent][child]] = "";
        values.push(childObj);
      }
  
      transDict[key] = values;
      
    }
  }
  }

  app.post("/storeTree/", function(req, res) {

    res.setHeader('Content-Type', 'application/json');

      var tree = req.body.tree;
      storeTemplateTree = tree;
      // console.log(tree)
     
  });





  function parseXml(fieldName, transTree){
    return fs.readFile( './dsedataTest.xml').then(data => {
    parser.parseString(data, function (err, result) {
        this.result =   result;
        function getXmlfields(fieldName){
            var treeParents = [];
            for(var j = 0; j < result.dsedataAll.kColl.length; ++j){
             data  = result.dsedataAll.kColl[j]['$'].id;
             if(data == fieldName){
                   for(var i = 0; i < result.dsedataAll.kColl[j]['refData'].length; ++i){
                       treeObj =  result.dsedataAll.kColl[j]['refData'][i]['$'];
                       var values = Object.values(treeObj)
                       treeParents[i] = (values[0].includes('List') ? (values[0].slice(0,values[0].indexOf('List'))) + 'Data' : values[0]);
    
                        if(treeParents[i].includes('Data')){
        
                            parent = treeParents[i];
                            transTree[parent] = [];

                        }else{

                            transTree[parent].push(treeParents[i]) 
                         
                        }
                        getXmlfields(treeParents[i]);
                   } 

                   
             }
          }

           return treeParents;
        }
        getXmlfields(fieldName)
        // setTransTree(transTree)
        // console.log(transTree.anqnlc11nigreretData)
    });


    return Promise.resolve(transTree) }).
    catch(e=>Promise.reject(e));


  }

  // app.get("/refreshTree/", (request, response) => {
  //   console.log("currentTree")
  //   console.log(currentTree)
  //   response.json(currentTree)
  // });
  

  function hasChildren(parent, transTree) {
    return transTree[parent].length > 0;
  }

  /*************************For Table*******************************/
  var newRow = [];
  var rows = [];
  var cols = ["id", "x", "y", "z"];
  var id = 0;

  app.post("/addNewRow/", function (req, res) {
    res.setHeader("Content-Type", "application/json");
  
    newRow = req.body.newRow;
    if (newRow["id"] == null) {
      newRow["id"] = id;
      id++;
      rows.push(newRow);
      res.end(JSON.stringify({ id: newRow["id"], status: true, action: "add" }));
    } else {
      editRow(newRow);
      res.end(JSON.stringify({ id: newRow.id, status: true, action: "edit" }));
    }
  
    console.log(rows);
  });

  
app.get("/getRows/", (request, response) => {
  response.end(JSON.stringify(rows.slice()));
});

app.get("/getCols/", (request, response) => {
  response.end(JSON.stringify(cols.slice()));
});

app.post("/removeRow/", function (req, res) {
  var rowToRemove = req.body.rowToRemove;
  var ind = findIndex(rowToRemove);
  rows.splice(ind, 1);
  res.end(JSON.stringify({ status: true, action: "delete" }));
});

function editRow(newRow) {
  const result = rows.filter((row) => row.id === newRow["id"]);
  const ind = rows.indexOf(result[0]);
  rows[ind] = newRow;
  console.log(rows);

  //todo : whats happend if ID not exists?
}

function findIndex(rowChanged) {
  const result = rows.filter((row) => row.id === rowChanged["id"]);
  return rows.indexOf(result[0]);
}
