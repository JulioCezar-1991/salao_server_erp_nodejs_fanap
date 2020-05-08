'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');


exports.get = async () => {
    const res = await Product
    .find({
        active: true
    }, 'title price slug description averagetime dataHoraRegistro');
    return res;
}

exports.create = async (data) => {
    var product = new Product(data);
    await product.save();
};

exports.patch = async (id, data) => {
    await Product
        .findByIdAndUpdate(id, data);
}

exports.delete = async (id) => {
    return Product
        .findOneAndRemove(id)
}