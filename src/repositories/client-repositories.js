'use strict';

const mongoose = require('mongoose');
const Client = mongoose.model('Client');

exports.get = async () => {
    const res = await Client
    .find();
    return res;
}

exports.create = async (data) => {
    var client = new Client(data);
    await client.save();
};

exports.getById = async(id) => {
    const res = await Client.findById(id);
    return res;
};

exports.patch = async (id, data) => {
    await Client
        .findByIdAndUpdate(id,{
            $set: { 
                name: data.name,
                cpf: data.cpf,
                date: data.date,
                telcel: data.telcel,
                telfix: data.telfix,
                email: data.email,
                cep: data.cep,
                address: data.address,
                sector: data.sector,
                city: data.city, 
            }
        });
};

exports.delete = async (id) => {
    return Client
        .findOneAndRemove(id)
};