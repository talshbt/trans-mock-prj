const bodyParser = require('body-parser');
const express = require('express')
const fetch = require('node-fetch');
const xml2js = require('xml2js');
var fs = require('fs')
const PORT = process.env.PORT || 7777;
const app = express();
var parser = new xml2js.Parser();


/***************************************/
//for luAnc1ServerData
var transTree = {};
var parent;
var parents = [];
var fieldName = 'luAnc1ServerData';
var obj;
/***************************************/

var luAnc1ServerData = 
{
  blockSend001Data: [],
  anqnlc1wnigreretData: [
    'sugNigreretInt',        'sugPirteyMahaduraInt',
    'shemReshumaStr',        'rsmTimestampDbl',
    'sugMivneInt',           'misparBankCheshbonInt',
    'misparSnifCheshbonInt', 'misparCheshbonInt',
    'misparZihuyLakoachStr', 'kodMataraInt',
    'fillerStr',             'simanSofNigreretStr',
    'sugNigreretInt',        'sugPirteyMahaduraInt',
    'shemReshumaStr',        'rsmTimestampDbl',
    'sugMivneInt',           'misparBankCheshbonInt',
    'misparSnifCheshbonInt', 'misparCheshbonInt',
    'misparZihuyLakoachStr', 'kodMataraInt',
    'fillerStr',             'simanSofNigreretStr'
  ],
  blockReceive001Data: [],
  anqnlc11nigreretData: [
    'sugNigreretInt',
    'sugPirteyMahaduraInt',
    'shemReshumaStr',
    'rsmTimestampDbl',
    'sugMivneInt',
    'kamutBealimInt',
    'fillerStr',
    'simanSofNigreretStr'
  ],
  anqtlc1wnigreretData: [
    'sugNigreretInt',
    'sugPirteyMahaduraInt',
    'shemReshumaStr',
    'rsmTimestampDbl',
    'sugMivneInt',
    'misparTavlaInt',
    'misparShuraInt',
    'misparZihuyLakoachStr',
    'shemLakoach1Str',
    'shemPratiStr',
    'fillerStr',
    'simanSofNigreretStr'
  ],
  trqra001nigreretData: [],
  trqra002nigreretData: [],
  trqra004nigreretData: [],
  trqra005nigreretData: [],
  trqhd000nigreretData: [],
  trqhd002nigreretData: [],
  anc1OrderData: []
}
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
      parseXml(fieldName)
    //   console.log(fieldName);
        res.json(transTree)
    //   res.end(JSON.stringify(transTree));


  });



  function parseXml(fieldName){
    fs.readFile( './dsedataTest.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        this.result =   result;
        function getXmlfields(fieldName){
            var resTreeArr = [];
            for(var j = 0; j < result.dsedataAll.kColl.length; ++j){
             data  = result.dsedataAll.kColl[j]['$'].id;
             if(data == fieldName){
                   for(var i = 0; i < result.dsedataAll.kColl[j]['refData'].length; ++i){
                       obj =  result.dsedataAll.kColl[j]['refData'][i]['$'];
                       var values = Object.values(obj)
                       resTreeArr[i] = (values[0].includes('List') ? (values[0].slice(0,values[0].indexOf('List'))) + 'Data' : values[0]);
    
                        if(resTreeArr[i].includes('Data')){
        
                            parent = resTreeArr[i];
                            transTree[parent] = [];

                        }else{

                            transTree[parent].push(resTreeArr[i]) 
                         
                        }
                        getXmlfields(resTreeArr[i]);
                   } 

                   
             }
          }

           return resTreeArr;
        }


       getXmlfields(fieldName);
    //  console.log(transTree)
       

        


   
 

    });
});


  }

  


console.log(transTree)