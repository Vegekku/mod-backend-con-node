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

adSchema.pre('save', async function() {
  this.thumbnail = 'hola';
  console.log('pre', this);
});

adSchema.post('save', async function(doc) {
  console.log(this);
  await createThumbnail(doc.picture);
});

adSchema.pre('deleteMany', async () => {
  const ads = await Ad.find({
    picture: { $nin: ['bici.jpg', 'chaqueta.jpg', 'iphone.png'] }
  })
    .select('picture -_id')
    .exec();

  ads.forEach(async ad => {
    await deleteImage(ad.picture, true);
  });
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
