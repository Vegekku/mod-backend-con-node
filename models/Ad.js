'use strict';

const mongoose = require('mongoose');

// TODO tags puede ser otro modelo
const adSchema = mongoose.Schema({
  name: { type: String, index: true },
  sale: { type: Boolean, index: true },
  price: { type: Number, index: true },
  picture: String,
  tags: { type: [String], index: true }
});

/**
 * List of allowed tags
 */
adSchema.statics.allowedTags = () => {
  return ['work', 'lifestyle', 'motor', 'mobile'];
};

// TODO Crear método estático que devuelva URL completa al recurso picture - getURLPicture
/**
 * List of ads
 */
adSchema.statics.list = async (filters, skip, limit, sort) => {
  const query = Ad.find(filters);

  // query.skip(skip).limit(limit).select(fields).sort(sort);
  query
    .skip(skip)
    .limit(limit)
    .sort(sort);

  return query.exec();
};

adSchema.statics.createRecord = async data => new Ad(data).save();

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
