'use strict';

/**
 * Micro service to create thumbnail from image
 */

const cote = require('cote');
const jimp = require('jimp');
const path = require('path');
const { fileSuffix } = require('../lib/utils');

const responder = new cote.Responder({
  name: 'create thumbnail responder'
});

responder.on('createThumbnail', async req => {
  const imageName = req.image;
  const thumbnailName = fileSuffix(imageName, '_thumbnail');
  const imagePath = path.join(__dirname, '../public', imageName);
  const thumbnailPath = path.join(__dirname, '../public', thumbnailName);

  // try {
  console.log(`Creating thumbnail for ${imagePath}...`);
  const thumbnail = await jimp.read(imagePath);
  thumbnail.resize(100, 100).write(thumbnailPath);
  console.log(`Thumbnail created in ${thumbnailPath}...`);
  return thumbnailName;
  // cb(null, thumbnailName);
  // } catch (err) {
  // cb(err, null);
  // }
});
