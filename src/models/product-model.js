'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
   
    title: {
        type: String,
        required: true,
        trim: true, //Usado para remover espaços em branco
        index: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    averagetime: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    dataHoraRegistro:{
        type: Date,
        default: Date.now,
        require: true
    }
});

module.exports = mongoose.model('Product', schema);