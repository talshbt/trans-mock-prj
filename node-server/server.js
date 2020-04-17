/*****************************************************************************/
var newRow = [];
var rows = [];
var cols = ["id", "x", "y", "z"];
var id = 0;

const bodyParser = require("body-parser");
const express = require("express");
const util = require("util");

const PORT = process.env.PORT || 3128;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, function () {
  console.log(`App running on localhost:${PORT}`);
});

app.get("/", function (req, res) {
  console.log(req.body);
  // res.json({ message: "Welcome to bezkoder application." });
  res.end(JSON.stringify(rows));
});

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
