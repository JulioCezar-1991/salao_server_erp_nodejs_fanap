'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const userRoute = require('./routes/user-route'); 



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', indexRoute);
app.use('/', productRoute);
app.use('/', userRoute);

module.exports = app;


/* con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});  */

/* con.connect(function(err){
  if(err) throw err;
  console.log("Connected");
  var sql = "CREATE TABLE IF NOT EXISTS mydb.Clientes (\n"+
                  "ID int NOT NULL AUTO_INCREMENT,\n"+
                  "Nome varchar(150) NOT NULL,\n"+
                  "CPF char(11) NOT NULL,\n"+
                  "PRIMARY KEY (ID)\n"+
                  ");";
  con.query(sql, function (err, result) {
    if(err) throw err;
    console.log("Table created");
  })
});  */

/* con.connect(function(err){
  if (err) throw err;
  console.log("Connected");
  var sql = "INSERT INTO mydb.customers(name, address) VALUES ('Company Inc',  'Highway 37')";
  con.query(sql, function (err, result){
    if (err) throw err;
    console.log("1 record insertd");
  })
}); */

/* con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO mydb.aluno (nome, sobrenome) VALUES ?";
  var values = [
    ['Julio', 'Cezar'],
    ['Willian', 'Indefinido'],
    ['Yure', 'Pereira'],
    ['Caio', 'Lemes'],
    ['Michael', 'Valley'],
    ['Sandy', 'Junior'],
    ['Eduardo', 'Zero']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}); */


/* con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM mydb.customers ORDER BY name", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}); */

/* con.connect(function(err) {
  if (err) throw err;
  var sql = "SELECT * FROM mydb.customers LIMIT 5 OFFSET 2";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}); */

/* con.connect(function(err) {
  if (err) throw err;
  var sql = "DELETE FROM mydb.customers WHERE name = 'Company Inc'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.effectedRows);
  });
}); */


/* con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE mydb.customers SET address = 'Rua' WHERE address = 'John'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
}); */


// Carrega as Rotas

