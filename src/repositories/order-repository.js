'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async(data) => {
    var res = await Order.find({},  'number status')
    .populate('customer', 'name')
    .populate('client', 'name email telcel telfix') // Método para trazer os dados do cliente
    .populate('itens.product', 'title price quantity' ); // Método para trazer os dados do produtos
    return res;
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
};

exports.delete = async (id) => {
    return Order
        .findOneAndRemove(id)
}