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
var storeTransTree = {};

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
      
      parseXml(fieldName,transTree).
      then(tree => {
        res.json(tree)   
      })
      .catch(e=>res.json({"Error":"got Error from parseXML","Exception":e}));


        
      console.log("storeTransTree")
      console.log(storeTransTree)


  });


  app.post("/postTree/", function(req, res) {

    res.setHeader('Content-Type', 'application/json');

      var tree = req.body.tree;
      
      console.log(storeTransTree)
     
  });


  app.post("/storeTree/", function(req, res) {

    res.setHeader('Content-Type', 'application/json');

      var tree = req.body.tree;
      storeTransTree = tree;
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
        setTransTree(transTree)
        // console.log(transTree.anqnlc11nigreretData)
    });


    return Promise.resolve(transTree) }).
    catch(e=>Promise.reject(e));


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

function setTransTree(transTree){
  storeTransTree = transTree;
}
