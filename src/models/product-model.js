'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
   
    title: {
        type: String,
        required: true,
        trim: true,//Usada para remover espaços em branco
        unique: true
    },
    slug: { // Ex: Cadeira Games = cadeira-gamer  URI
        type: String,
        required: [true, 'O slug é obrigatorio'],
        trim: true,
        index: true,
        unique: true
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
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
});

module.exports = mongoose.model('Product', schema);