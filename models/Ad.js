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

adSchema.statics.list = (filters, skip, limit, sort) => {
    const query = Ad.find(filters);

    // query.skip(skip).limit(limit).select(fields).sort(sort);
    query.skip(skip).limit(limit).sort(sort);

    return query.exec();
};

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;