'use strict';

/**
 * Micro service to create thumbnail from image
 */

const cote = require('cote');
const { fileSuffix } = require('../lib/utils');

const responder = new cote.Responder({
  name: 'create thumbnail responder'
});

responder.on('createThumbnail', (req, done) => {
  const srcImagePath = req.image;
  const srcThumbnailPath = fileSuffix(srcImagePath, '_thumbnail');

  console.log(`Creating thumbnail for ${srcThumbnailPath}...`);

  // Create thumbnail
  done(null);

  // return thumbnail;
});
