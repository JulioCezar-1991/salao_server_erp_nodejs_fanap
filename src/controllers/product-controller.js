'use strinc';

const mysql = require('mysql');

exports.postLogin = (req, res, next) => {
    var login = req.query.login.substring(0, 150);
    var password = req.query.password.substring(0, 150);
    console.log(req.query.login);
    execSQLQuery(`SELECT usuario.login, usuario.password FROM mydb.usuario WHERE usuario.login = "${login}" AND usuario.password = "${password}";`, res);
};


exports.postCreateLogin = (req, res, ne) => {
    const empresa = req.query.empresa.substring(0, 150);
    const name = req.query.name.substring(0, 150);
    const login = req.query.login.substring(0, 150);
    const password = req.query.password.substring(0, 11);
    const telefone = req.query.telefone.substring(0, 11);
    const email = req.query.email.substring(0, 11);
    console.log(req.query);
    queryCreateUser(`INSERT INTO mydb.usuario(usuario.name, usuario.login, usuario.password) VALUES('${name}','${login}','${password}')`,
        `INSERT INTO mydb.contato(contato.telefone, contato.email, id_usuario) VALUES('${telefone}','${email}', (select usuario.id_usuario from mydb.usuario where usuario.id_usuario = last_insert_id()));`,
        `INSERT INTO mydb.empresa(empresa.empresa, empresa.id_usuario) VALUES('${empresa}', (select max(usuario.id_usuario) from mydb.usuario));`, res);
};

/* exports.postCreateLogin = (req, res) => {
    const name = req.query.name.substring(0, 150);
    const login = req.query.login.substring(0, 150);
    const password = req.query.password.substring(0, 11);
    console.log(req.query);
    execSQLQuery(`INSERT INTO mydb.usuario(usuario.name, usuario.login, usuario.password) VALUES('${name}','${login}','${password}');`, res);
}; */

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
            console.log('executou!');

        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}

function queryCreateUser(sqlUser, sqlCon, sqlEmp, res) {
    const connection = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "root",
        database: "mydb"
    });
    connection.query(sqlUser, function (error) {
        if (error)
            console.log('executou um erro user!');
        else
            return connection.query(sqlCon, function (error, results, fields) {
                if (error)
                    console.log('executou um erro con!');
                else
                    return connection.query(sqlEmp, function (error, results, fields) {
                        if (error)
                            console.log('executou um erro emp!');
                        else
                            res.json(results);
                        connection.end();
                        console.log('execução bem sucedida !');
                    });
            });
    });
}

