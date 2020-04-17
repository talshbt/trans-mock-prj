

/*****************************************************************************/
var newRow =[];
var rows = [];
var cols = ["id", "x", "y", "z"];
var onEditMode = false;
var rowIndexToEdit = null;
var rowToEdit = [];
var id = 0;
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



  app.post("/addNewRow/", function(req, res) {

    res.setHeader('Content-Type', 'application/json');

      newRow = req.body.newRow;
      if(newRow['id'] == null){
        newRow['id'] = id;
        id++;
        rows.push(newRow);
        res.end(JSON.stringify({"id":newRow['id'],"status":true,"action":"add"}));

      }else{
        editRow(newRow);
        res.end(JSON.stringify({"id":newRow.id,"status":true,"action":"edit"}));

      }
     
      console.log(rows);

  });

  app.get('/getRows/', (request, response) => {
    response.end(JSON.stringify(rows.slice()));


  });
  
  app.get('/getCols/', (request, response) => {
    response.end(JSON.stringify(cols.slice()));

  });  
    
  app.post("/removeRow/", function(req, res) {

   
    var rowToRemove =  req.body.rowToRemove;
    var ind2 = findIndex(rowToRemove);
    // console.log(ind2)
    rows.splice(ind2, 1);
    // console.log(rows);
    res.end(JSON.stringify({"status":true,"action":"delete"}));

    // res.end(JSON.stringify(rows.slice()));


  });


  function editRow(newRow){
  
      var ind;
      const result = rows.filter( row => row.id ===  newRow['id']);
      ind = rows.indexOf(result[0])
      rows[ind] = newRow;
      console.log(rows)

      //todo : whats happend if ID not exists?
    
  }

  function findIndex(rowChanged){
    const result = rows.filter( row => row.id===  rowChanged['id']);
    return rows.indexOf(result[0]);
  }

//   app.post("/editRow/", function(req, res) {
//     // console.log("in edit row ")
//     // onEditMode = true;
//     // rowIndexToEdit = req.body.index;
//     // for (var i = 0; i < cols.length; ++i) {
//     //  rowToEdit.push(rows[req.body.index][cols[i]]);
//     // }

//     // rows[rowIndexToEdit] = newRow;
//   // console.log(req.body.index);
//   // console.log(req.body.row);

//   // console.log(rows[req.body.index])
 
//   // this.rows[req.body.index] = req.body.row;

//    res.setHeader('Content-Type', 'application/json');
//    res.end(JSON.stringify(rows.slice()));


//  });


//  app.post("/editRow2/", function(req, res) {


// console.log(req.body.index);

// console.log(rows[req.body.index])

// // this.rows[req.body.index] = req.body.row;

//  res.setHeader('Content-Type', 'application/json');
//  res.end(JSON.stringify(rows[req.body.index]));


// });