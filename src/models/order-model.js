'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    number: {
        type: String,
        required: true,
    },
    schedulingdate: {
        type: String,
        required: true,
    },
    itens: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price : {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    status: {
        type: String,
        required: true,
        enum: ['open', 'done', 'canceled'],
        default: 'open'
    },
    createDate:{
        type: Date,
        default: Date.now,
        require: true
    }
});

module.exports = mongoose.model('Order', schema);