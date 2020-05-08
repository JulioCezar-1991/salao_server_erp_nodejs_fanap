'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.getOrderAll = async(data) => {
    var res = await Order.find({},  'number status subtotal createDate')
    .populate('customer', 'name email telcel telfix')
    .populate('client', 'name email telcel telfix') // Método para trazer os dados do cliente
    .populate('itens.product', 'title price averagetime' ); // Método para trazer os dados do produtos
    return res;
}

exports.getOrderOpen = async(data) => {
    var res = await Order.find({ status : "open"},  'number status subtotal createDate')
    .populate('customer', 'name email telcel telfix')
    .populate('client', 'name email telcel telfix')
    .populate('itens.product', 'title price averagetime' );
    return res;
}

exports.getOrderDone = async(data) => {
    var res = await Order.find({ status : "done"},  'number status subtotal createDate')
    .populate('customer', 'name email telcel telfix')
    .populate('client', 'name email telcel telfix')
    .populate('itens.product', 'title price averagetime' );
    return res;
}

exports.getOrderCanceled = async(data) => {
    var res = await Order.find({ status : "canceled"},  'number status subtotal createDate')
    .populate('customer', 'name email telcel')
    .populate('client', 'name email telcel telfix') // Método para trazer os dados do cliente
    .populate('itens.product', 'title price averagetime' ); // Método para trazer os dados do produtos
    return res;
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
};

exports.patch = async (id, data) => {
    await Order
        .findByIdAndUpdate(id, data,
            function (err, result) {
                console.log(err);
            }, 
        );
};

exports.delete = async (id) => {
    return Order
        .findOneAndRemove(id)
}