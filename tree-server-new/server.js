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
      then(tree => res.json(tree))
      .catch(e=>res.json({"Error":"got Error from parseXML","Exception":e}));


        


  });


  app.post("/postTree/", function(req, res) {

    res.setHeader('Content-Type', 'application/json');

      var tree = req.body.tree;
      console.log(tree)
     


        


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
        console.log(transTree.anqnlc11nigreretData)
    });


    return Promise.resolve(transTree) }).
    catch(e=>Promise.reject(e));


  }

  