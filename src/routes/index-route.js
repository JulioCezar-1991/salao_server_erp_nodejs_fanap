'use strict'

const express = require('express');
const router = express.Router();

const app = express();
const mysql = require('mysql');

router.get('/get/cliente', (req, res) => {
    execSQLQuery('SELECT * FROM  mydb.cliente', res);
});

router.get('/get/cliente/:id?', (req, res) => { 
    let filter = '';
    if (req.params.id) filter = (req.params.id);
    execSQLQuery(`SELECT * FROM  mydb.cliente where idcliente = "${filter}%";`, res);
});

router.get('/get/cliente/pesquisa/:nome?', (req, res) => {
    let filter = '';
    if (req.params.nome) filter = (req.params.nome);
    execSQLQuery(`SELECT * FROM  mydb.cliente where cliente.nome like "%${filter}%";`, res);
});

router.get('/get/clientecontato', (req, res) => {
    execSQLQuery(`SELECT * FROM mydb.cliente as cli inner join mydb.contato as con where cli.idcliente = con.idcliente;`, res);
});

module.exports = router;
app.use('/', router);

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "root",
        database: "mydb"
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            console.log('executou!');

        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
} 


