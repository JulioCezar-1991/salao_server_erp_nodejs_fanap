'use strinc';

const connection = require('../connection');

exports.postLogin = (req, res, next) => {
    var body = req.body;
    console.log(body);
    var login = body.login;
    var password = body.password;
    queryLogin(`SELECT codigo_usuario, nome_completo, telefone, email, login, Permissao_Codigo FROM usuario WHERE login = '${login}' AND senha = '${password}';`, res);
};

exports.postCreateLogin = (req, res, next) => {
    var body = req.body;
    var nomeCompleto = body.nomeCompleto.substring(0, 150);
    var telefone = body.telefone.substring(0, 150);
    var email = body.email.substring(0, 150);
    var login = body.login.substring(0, 11);
    var password = body.password.substring(0, 11);
    var Permissao_codigo = parseInt(body.Permissao_codigo);
    queryCreateUser(`INSERT INTO bdfanap.usuario(nome_completo, telefone, email, login, senha, Permissao_Codigo) VALUES ('${nomeCompleto}', '${telefone}', '${email}','${login}', '${password}', '${Permissao_codigo}')`,
        `SELECT * FROM bdfanap.usuario where codigo = (select max(usuario.codigo) from usuario);`, res);
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
    console.log('patch');
    execSQLQuery(`UPDATE mydb.usuario SET usuario.name= '${name}', usuario.login='${login}' WHERE usuario.id_usuario= ${id}`, res);
};

exports.delete = (req, res) => {
    console.log("Aqui");
    execSQLQuery('DELETE FROM mydb.usuario WHERE usuario.id_usuario =' + parseInt(req.params.id), res);
};


function queryLogin(sqlQry, res) {
    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            console.log('Erro ao logar!');
        else
            res.json(results);
        console.log('Usuario logou no Sistema!');
    });
}

function queryCreateUser(sqlQry, sqlUser, res) {

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            res.send(error.code);
        } else {
            return connection.query(sqlUser, function (error, results, fields) {
                if (error)
                    console.log('executou um erro emp!');
                else
                    res.json(results);
            })
        }
    }
    )
}

