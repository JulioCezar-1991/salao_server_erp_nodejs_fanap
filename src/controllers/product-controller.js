'use strinc';

const mysql = require('mysql');

exports.postLogin = (req, res, next) => {
	var nome = req.query.nome.substring(0, 150);
    var senha = req.query.senha.substring(0, 150);
    console.log(nome, senha);
    execSQLQuery(`SELECT cliente.nome, cliente.senha FROM mydb.cliente WHERE cliente.nome = "${nome}" AND cliente.senha = "${senha}";`, res);    
};

exports.postCreateLogin = (req, res) => {
    const nome = req.query.nome.substring(0, 150);
    const senha = req.query.senha.substring(0, 150);
    const cpf = req.query.cpf.substring(0, 11);
    console.log(req.query);
    execSQLQuery(`INSERT INTO mydb.cliente(cliente.nome, cliente.senha, cliente.cpf) VALUES('${nome}','${senha}','${cpf}');`, res);
};

exports.put = (req, res, next) => {
    const id = parseInt(req.params.id);
    const nome = req.query.nome.substring(0, 150);
    execSQLQuery(`UPDATE mydb.cliente SET cliente.nome= '${nome}', cliente.cpf='${cpf}' WHERE cliente.idcliente= ${id}`, res);
};

exports.patch = (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.query.nome.substring(0, 150);
    const cpf = req.query.cpf.substring(0, 11);
    execSQLQuery(`UPDATE mydb.cliente SET cliente.nome= '${nome}', cliente.cpf='${cpf}' WHERE cliente.idcliente= ${id}`, res);
};

exports.delete = (req, res) => {
    console.log("Aqui");
    execSQLQuery('DELETE FROM mydb.cliente WHERE cliente.idcliente =' + parseInt(req.params.id), res);
};

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
            console.log('executou um erro!');

        else
            res.json(results);
        connection.end();
        console.log('execução bem sucedida !');
    },);
}

