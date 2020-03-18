'use strict';

const repository = require('../repositories/client-repositories');
const emailService = require('../services/email-service');

exports.get = async(req, res, next) => {
    try {
    var data = await repository.get();
    res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    try{
        await repository.create(req.body);
        res.status(201).send({
            message: "Cliente cadastrado com sucesso!"
         });
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }  
};

exports.put = async (req, res, next) => {
    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({
                message: 'Cadastro atualizado com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição'
        });
    }       
};

exports.delete = async (req, res, next) => {
    repository.delete(req.body.id)
    .then(x=> {
        res.status(200).send({
            message: 'Cadastro removido com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao remover produto',
            data: e
        });
    });
};