


/*****************************************************************************/
var dbController = (function() {
  const sqlite3 = require('sqlite3').verbose();

  function insertData(NoteMessage){

    db.run('INSERT INTO TODONOTES (NoteMessage) VALUES (?)', [NoteMessage]);
  
  }


return {



createTable: function() {
   
},
read: function (){

       
      },


      

  addNewNote: function (NoteMessage){
     
  },
  reset: function(){

},

  deleteNote: function (id){
       
    },

    deleteAll: function (){
        
       
    },
 
    update: function(NoteMessage, id){
     
    }
   
  
};

})();

/*****************************************************************************/


const bodyParser = require('body-parser');
  const express = require('express')
  const PORT = process.env.PORT || 3128;
  const app = express();
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

    app.listen(PORT, function(){
    console.log(`App running on localhost:${PORT}`);
  });

    app.get('/', function(req,res){
    res.send("Welcome to Invoicing App");
  });

  app.get("/createDataStorage", function(req, res) {
  
    // db = dbController.createTable();  
    res.send("createTable Succses");
  
  });


  app.post("/addData", function(req, res) {
  

    
  });
  
    
    
