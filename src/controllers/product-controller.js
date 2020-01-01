'use strinc';

const connection = require('../connection');

exports.postLogin = (req, res) => {
    var body = req.body;
    var login = body.login.substring(0, 14);
    var password = body.password.substring(0, 14);
    queryLogin(`SELECT codigo, nomeCompleto, telefone, email, login, Permissao_codigo FROM usuario WHERE login = "${login}" AND password = "${password}";`, res);

}

exports.postCreateLogin = (req, res, next) => {
    var body = req.body;
    var nomeCompleto = body.nomeCompleto.substring(0, 150);
    var telefone = body.telefone.substring(0, 150);
    var email = body.email.substring(0, 150);
    var login = body.login.substring(0, 11);
    var password = body.password.substring(0, 11);
    var Permissao_codigo = parseInt(body.Permissao_codigo);
    console.log(body);
    queryCreateUser(`INSERT INTO bdfanap.usuario(nomeCompleto, telefone, email, login, password, Permissao_codigo) VALUES ('${nomeCompleto}', '${telefone}', '${email}','${login}', '${password}', '${Permissao_codigo}')`,
        `SELECT * FROM bdfanap.usuario where codigo = (select max(usuario.codigo) from usuario);`, res);
};

exports.postCreateService = (req, res, next) => {
    var body = req.body;
    const descricao = body.descricao.substring(0, 11);
    const valor = parseFloat(body.valor);
    const tempoGasto = parseInt(body.tempoGasto);
    const TipoServico_codigo = parseInt(body.TipoServico_codigo);
    console.log(body);
    queryCreateService(`INSERT INTO bdfanap.servico (descricao, valor, tempoGasto, TipoServico_codigo) VALUES ('${descricao}', '${valor}', '${tempoGasto}', '${TipoServico_codigo}')`,
        `SELECT * FROM bdfanap.servico where codigo = (select max(servico.codigo) from servico);`, res);
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

function queryLogin(sqlQry, res) {

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            console.log('Erro ao logar!');
        else
            res.json(results);
        console.log('Usuarilo logou no Sistema!');
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


function queryCreateService(sqlQry, sqlUser, res) {
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







/* function queryCreateUser(sqlUser, sqlCon, sqlEmp, res) {
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

                        console.log('execução bem sucedida !');
                    });
            });
    }); */
/* queryCreateUser(`INSERT INTO mydb.usuario(usuario.name, usuario.login, usuario.password) VALUES('${name}','${login}','${password}')`,
        `INSERT INTO mydb.contato(contato.telefone, contato.email, id_usuario) VALUES('${telefone}','${email}', (select usuario.id_usuario from mydb.usuario where usuario.id_usuario = last_insert_id()));`,
        `INSERT INTO mydb.empresa(empresa.empresa, empresa.id_usuario) VALUES('${empresa}', (select max(usuario.id_usuario) from mydb.usuario));`, res); */