

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

  // app.get("/createDataStorage", function(req, res) {
  
  //   // db = dbController.createTable();  
  //   res.send("createTable Succses");
  
  // });


  app.post("/addNewRow/", function(req, res) {

     
     

      // if(req.body.newRow){
      //   console.log('newrow')
      // }

    

      newRow = req.body.newRow;
      // console.log(req.body)
      if(newRow['id'] == null){
        newRow['id'] = id;
        id++;
        // console.log("add row " + id + ":")
        // console.log(newRow)
        rows.push(newRow);
        // console.log(rows)
        
      }else{
        var ind;
        // console.log(ind)
        const result = rows.filter( row => row.id===  newRow['id']);
        ind = rows.indexOf(result[0])
        rows[ind] = newRow;
        console.log(rows)

      }

      // console.log(newRow)
      // rows.push(newRow);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(rows.slice()));

  });

  app.get('/getRows/', (request, response) => {
    response.end(JSON.stringify(rows.slice()));


  });
  
  app.get('/getCols/', (request, response) => {
    response.end(JSON.stringify(cols.slice()));

  });  
    
  app.post("/removeRow/", function(req, res) {
     console.log(req.body.index);
    // rows.push(req.body.newRow);
    rows.splice(req.body.index, 1);
    console.log(this.rows);
    // this.dataChanged.next(this.rows.slice());
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(rows.slice()));


  });


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