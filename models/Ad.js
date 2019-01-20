'use strict';

const mongoose = require('mongoose');

// TODO tags puede ser otro modelo
const adSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    picture: String,
    tags: [String]
});

// TODO Crear método estático que devuelva URL completa al recurso picture - getURLPicture

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;