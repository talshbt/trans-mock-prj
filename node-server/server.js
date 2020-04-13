


/*****************************************************************************/
// var dbController = (function() {
 


// return {



// createTable: function() {
   
// },
// read: function (){

       
//       },


      

//   addNewNote: function (NoteMessage){
     
//   },
//   reset: function(){

// },

//   deleteNote: function (id){
       
//     },

//     deleteAll: function (){
        
       
//     },
 
//     update: function(NoteMessage, id){
     
//     }
   
  
// };

// })();

/*****************************************************************************/

var rows = [];
var cols = ["id", "name", "email"];

const util = require('util');

const bodyParser = require('body-parser');
  const express = require('express')
  const PORT = process.env.PORT || 3128;
  const app = express();

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

  app.get('/', function(req,res){
      console.log(req.body)
      // res.json({ message: "Welcome to bezkoder application." });
      res.end(JSON.stringify(rows));
  });

  // app.get("/createDataStorage", function(req, res) {
  
  //   // db = dbController.createTable();  
  //   res.send("createTable Succses");
  
  // });


  app.post("/addNewRow/", function(req, res) {

  console.log(req.body.newRow);
  rows.push(req.body.newRow);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(rows));

  });

  app.get('/getRows/', (request, response) => {
    response.end(JSON.stringify(rows));


  });
  
  app.get('/getCols/', (request, response) => {
    response.end(JSON.stringify(cols));


  });  
    
