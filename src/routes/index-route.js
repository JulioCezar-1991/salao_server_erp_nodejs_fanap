'use strict'

const express = require('express');
const router = express.Router();

const app = express();
const connection = require('../connection');


router.get('/servico', (req, res, rows) => {
    execSQLQuery('SELECT * FROM bdfanap.servico', res);
});

router.get('/categoria', (req, res, rows) => {
    execSQLQuery('SELECT * FROM bdfanap.tiposervico', res);
});

router.get('/get/usuario/:id?', (req, res) => { 
    let filter = '';
    if (req.params.id) filter = (req.params.id);
    execSQLQuery(`SELECT * FROM  mydb.usuario where id_usuario = "${filter}%";`, res);
});

router.get('/get/usuario/pesquisa/:name?', (req, res) => {
    let filter = '';
    if (req.params.name) filter = (req.params.name);
    execSQLQuery(`SELECT * FROM  mydb.usuario where usuario.name like "%${filter}%";`, res);
});

router.get('/get/usuario_contato', (req, res) => {
    execSQLQuery(`SELECT * FROM mydb.usuario as cli inner join mydb.contato as con where cli.id_usuario = con.id_usuario;`, res);
});

module.exports = router;
app.use('/', router);

function execSQLQuery(sqlQry, res) {

    connection.query(sqlQry, function (error, res, fields) {
        if (error){
            console.log('Erro ' + error.code);
        }else{
            res.json(results);    
        }
        console.log('executou!');
    });
} 


