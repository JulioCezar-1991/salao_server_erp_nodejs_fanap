'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    const res = await Customer
    .find();
    return res;
}

exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();
};

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        login: data.login,
        password: data.password
    });
    return res;
};

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
};

exports.update = async (id, data) => {
    await Customer
        .findByIdAndUpdate(id,{
            $set: {
                use: data.use,
                email: data.email,
                password: data.password
            }
        });
};

exports.delete = async (id) => {
    return Customer
        .findOneAndRemove(id)
};