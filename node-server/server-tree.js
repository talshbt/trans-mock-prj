// npm install express
// npm install fixer api
// nmp install fetch 
// than type node app.js
// simple go to the folder contain this file(save him as app.js) and type. 

const fetch = require('node-fetch');
var express = require('express');
var app = express();
var fs = require('fs'),
xml2js = require('xml2js');
const util = require('util');

var parser = new xml2js.Parser();

var dict = {};
var res;
var arr = [];
var parent;
var exapmle = []

 app = express();


app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});



app.get('/trans/:fieldName', (request, response) => {
    // console.log('Request is:', request.params)
    var fieldName = request.params.fieldName;
    console.log(fieldName)
  
    fs.readFile( './dsedataTest.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
           
        function getXmlfields(fieldName){
          console.log("fieldName = " + fieldName)

            var myResultArr = [];
            // var x;
            for(var j = 0; j < result.dsedataAll.kColl.length; ++j){
             data  = result.dsedataAll.kColl[j]['$'].id;
             if(data == fieldName){
                   for(var i = 0; i < result.dsedataAll.kColl[j]['refData'].length; ++i){
                       var obj =  result.dsedataAll.kColl[j]['refData'][i]['$'];
                       var values = Object.values(obj)
                       myResultArr[i] = (values[0].includes('List') ? (values[0].slice(0,values[0].indexOf('List'))) + 'Data' : values[0]);
    
                        if(myResultArr[i].includes('Data')){
        
                            parent = myResultArr[i];
                            dict[parent] = [];

                        }else{

                            dict[parent].push(myResultArr[i]) 
                         
                        }
                        getXmlfields(myResultArr[i]);
                   } 

                   
             }
          }

           return myResultArr;
        }


       arr =getXmlfields(fieldName);
      // arr = util.inspect(dict, {showHidden: false, depth: null});

        // console.log(dict)

        

        response.json(dict)

   
 

    });

});

});





var port = 6666 ;


app.listen(port);

console.log(`node express app started at http://localhost:${port}`)
