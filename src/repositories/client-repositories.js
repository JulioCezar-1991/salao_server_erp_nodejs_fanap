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

exports.update = async (id, data) => {
    await Client
        .findByIdAndUpdate(id,{
            $set: {
                use: data.use,
                email: data.email,
                password: data.password
            }
        });
};

exports.delete = async (id) => {
    return Client
        .findOneAndRemove(id)
};