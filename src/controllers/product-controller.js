'use strinc';

const connection = require('../connection');

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