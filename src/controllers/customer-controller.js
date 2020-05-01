'use strict';

const repository = require('../repositories/customer-repositories');
const md5 = require('md5'); //Utilizado para ocultar password
const authService = require('../services/auth-service');
/* const emailService = require('../services/email-service'); */

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

exports.post = async(req, res, next) => {
    try {
        await repository.create({
            name: req.body.name,
            telcel: req.body.telcel,
            email: req.body.email,
            login: req.body.login,
            password: md5(req.body.password + global.SALT_KEY),
            roles: req.body.roles
        });
        // Envio de Email para o usuario cadastrado
        /* emailService.send(
            req.body.email,
            'Bem vindo ao Node Store',
            global.EMAIL_TMPL.replace('{0}', req.body.name)); */

        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        res.status(201).send({
                email: customer.email,
                name: customer.name,
                roles: customer.roles,
        });
    } catch (e) {
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