'use stricy';

const repository = require('../repositories/order-repository');
const guid = require('guid'); // Utilizado para gerar o numero do pedido

exports.get = async(req, res, next) => {
    try {
    var data = await repository.get();
    res.status(200).send(data);
    console.log(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    try {
        await repository.create({
            customer: req.body.customer,
           client: req.body.client,
           number: guid.raw().substring(0, 6),
            itens: req.body.items 
        });
        console.log(req.body.client);
        res.status(201).send({
            message: 'Agendamento cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async (req, res, next) => {
    repository.delete(req.body.id)
    .then(x=> {
        res.status(200).send({
            message: 'Agendamento removido com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao remover o agendamento',
            data: e
        });
    });
};