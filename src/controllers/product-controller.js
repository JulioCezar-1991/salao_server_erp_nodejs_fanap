'use strinc';

const mysql = require('mysql');

exports.postLogin = (req, res, next) => {
	var name = req.query.name.substring(0, 150);
    var password = req.query.password.substring(0, 150);
    console.log(name, password);
    execSQLQuery(`SELECT usuario.name, usuario.password FROM mydb.usuario WHERE usuario.name = "${name}" AND usuario.password = "${password}";`, res);    
};

exports.postCreateLogin = (req, res) => {
    const name = req.query.name.substring(0, 150);
    const login = req.query.login.substring(0, 150);
    const password = req.query.password.substring(0, 11);
    console.log(req.query);
    execSQLQuery(`INSERT INTO mydb.usuario(usuario.name, usuario.login, usuario.password) VALUES('${name}','${login}','${password}');`, res);
};

exports.put = (req, res, next) => {
    const id = parseInt(req.params.id);
    const name = req.query.name.substring(0, 150);
    const login = req.query.login.substring(0, 11);
    execSQLQuery(`UPDATE mydb.usuario SET usuario.name= '${name}', usuario.login='${login}' WHERE usuario.id_usuario= ${id}`, res);
};

exports.patch = (req, res) => {
    const id = parseInt(req.params.id);
    const name = req.query.name.substring(0, 150);
    const login = req.query.login.substring(0, 11);
    execSQLQuery(`UPDATE mydb.usuario SET usuario.name= '${name}', usuario.login='${login}' WHERE usuario.id_usuario= ${id}`, res);
};

exports.delete = (req, res) => {
    console.log("Aqui");
    execSQLQuery('DELETE FROM mydb.usuario WHERE usuario.id_usuario =' + parseInt(req.params.id), res);
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

