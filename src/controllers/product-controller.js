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
    })
};