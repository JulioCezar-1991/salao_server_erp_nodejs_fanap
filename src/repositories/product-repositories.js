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

/* exports.getBySlug = async (slug) => {
    const res = await Product
    .findOne({
        slug: slug,
        active: true}, 'title description price slug tags');
    return res;    
} */

exports.create = async (data) => {
    var product = new Product(data);
    await product.save();
};

exports.update = async (id, data) => {
    await Product
        .findByIdAndUpdate(id,{
            $set: {
                title: data.title,
                description: data.description,
                price: data.price
            }
        });
}

exports.delete = async (id) => {
    return Product
        .findOneAndRemove(id)
}