'use strict';

const mongoose = require('mongoose');
const { createThumbnail, deleteImage } = require('../lib/utils');

// TODO tags puede ser otro modelo
const adSchema = mongoose.Schema({
  name: { type: String, index: true },
  sale: { type: Boolean, index: true },
  price: { type: Number, index: true },
  picture: { type: String },
  thumbnail: { type: String },
  tags: { type: [String], index: true }
});

/**
 * Create and add a thumbnail before save ad
 */
adSchema.pre('save', async function() {
  const thumbnail = await createThumbnail(this.picture);
  this.thumbnail = thumbnail;
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

  query
    .skip(skip)
    .limit(limit)
    // .select(fields)
    .sort(sort);

  return query.exec();
};

adSchema.statics.createRecord = async data => new Ad(data).save();

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
