'use strict';

const cote = require('cote');
const fse = require('fs-extra');
const path = require('path');

const fileSuffix = (filename, suffix) =>
  filename.substr(0, filename.lastIndexOf('.')) +
  suffix +
  filename.substr(filename.lastIndexOf('.'));

const renderResponse = (res, view, data) => res.render(view, data);

const uploadFile = async file => {
  const filePath = path.join(__dirname, '../public/images', file.filename);

  console.log(`Uploading ${file.path} to ${filePath}...`);
  await fse.copyFile(file.path, filePath);
  console.log('Sucessfull uploading!');
  await fse.remove(file.path);

  return filePath;
};

const uploadImage = async (image, withThumbnail = false) => {
  const imagePath = await uploadFile(image);

  if (!withThumbnail) return imagePath;

  // const thumbnailRequester = new cote.Requester({
  //   name: 'create thumbnail requester'
  // });

  // thumbnailRequester.send({
  //   type: 'createThumbnail',
  //   image: imagePath
  // });

  // return { imagePath, thumbnailPath };
  return imagePath;
};

module.exports = {
  fileSuffix,
  renderResponse,
  uploadFile,
  uploadImage
};
