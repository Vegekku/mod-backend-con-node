'use strict';

/**
 * Micro service to create thumbnail from image
 */

const cote = require('cote');
const jimp = require('jimp');
const { fileSuffix } = require('../lib/utils');

const responder = new cote.Responder({
  name: 'create thumbnail responder'
});

responder.on('createThumbnail', async (req, cb) => {
  const srcImagePath = req.image;
  const srcThumbnailPath = fileSuffix(srcImagePath, '_thumbnail');

  try {
    console.log(`Creating thumbnail for ${srcImagePath}...`);
    const thumbnail = await jimp.read(srcImagePath);
    thumbnail.resize(100, 100).write(srcThumbnailPath);
    console.log(`Thumbnail created in ${srcThumbnailPath}...`);
    cb(null, srcThumbnailPath);
  } catch (err) {
    cb(err, null);
  }
});
