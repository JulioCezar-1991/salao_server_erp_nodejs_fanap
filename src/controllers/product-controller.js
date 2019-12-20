'use strinc';

const connection = require('../connection');

exports.postLogin = (req, res) => {
    var body = req.body;
    var login = body.login.substring(0, 150);
    var password = body.password.substring(0, 150);
    queryLogin(`SELECT codigo, nomeCompleto, telefone, email, login, Permissao_codigo FROM usuario WHERE login = "${login}" AND password = "${password}";`, res);

}


exports.postCreateLogin = (req, res, next) => {
    const nomeCompleto = req.query.nomeCompleto.substring(0, 150);
    const telefone = req.query.telefone.substring(0, 150);
    const email = req.query.email.substring(0, 150);
    const login = req.query.login.substring(0, 11);
    const password = req.query.password.substring(0, 11);
    const Permissao_codigo = parseInt(req.query.Permissao_codigo);
    console.log(req.query);
    queryCreateUser(`INSERT INTO bdfanap.usuario(nomeCompleto, telefone, email, login, password, Permissao_codigo) VALUES ('${nomeCompleto}', '${telefone}', '${email}','${login}', '${password}', '${Permissao_codigo}')`, res);
};

exports.postCreateService = (req, res, next) => {
    const descricao = req.query.descricao.substring(0, 150);
    const valor = parseFloat(req.query.valor);
    const tempoGasto = parseInt(req.query.tempoGasto);
    const TipoServico_codigo = parseInt(req.query.TipoServico_codigo);
    console.log(req.query);
    queryCreateService(`INSERT INTO bdfanap.servico (descricao, valor, tempoGasto, TipoServico_codigo) VALUES ('${descricao}', '${valor}', '${tempoGasto}', '${TipoServico_codigo}')`, res);
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
            console.log('executou!');
        else
            res.json(results);    
        console.log('executou!');
    });
} 
       
   


function queryCreateUser(sqlUser, res) {

    connection.query(sqlUser, function (error) {
        if (error) {
            res.send("Executou na um erro no cadastro de usuario!");
        } else {
            res.send('Execução bem sucedida!');
        };
    })
}

function queryCreateService(sqlUser, res) {

    connection.query(sqlUser, function (error) {
        if (error) {
            console.log(error);
            res.send("Executou um erro no cadastro do serviço!");
        } else {
            res.send('Execução bem sucedida!');
        };
    })
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
                        connection.end();
                        console.log('execução bem sucedida !');
                    });
            });
    }); */
/* queryCreateUser(`INSERT INTO mydb.usuario(usuario.name, usuario.login, usuario.password) VALUES('${name}','${login}','${password}')`,
        `INSERT INTO mydb.contato(contato.telefone, contato.email, id_usuario) VALUES('${telefone}','${email}', (select usuario.id_usuario from mydb.usuario where usuario.id_usuario = last_insert_id()));`,
        `INSERT INTO mydb.empresa(empresa.empresa, empresa.id_usuario) VALUES('${empresa}', (select max(usuario.id_usuario) from mydb.usuario));`, res); */