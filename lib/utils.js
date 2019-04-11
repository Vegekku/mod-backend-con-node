'use strict';

const cote = require('cote');
const fse = require('fs-extra');
const path = require('path');

/**
 * Add suffix to any file
 * @param {String} filename The name of file (with extension)
 * @param {String} suffix The suffix to add
 */
const fileSuffix = (filename, suffix) =>
  filename.substr(0, filename.lastIndexOf('.')) +
  suffix +
  filename.substr(filename.lastIndexOf('.'));

/**
 * Delete a file from directory
 * @param {String} directory Directory where file is located
 * @param {String} filename Name of file
 */
const deleteFile = async (directory, filename) => {
  const filePath = path.join(__dirname, directory, filename);
  console.log(`Removing ${filePath}...`);
  const result = await fse.remove(filePath);
  if (!result) return console.error(`${filePath} was not removed.`);

  return console.log('Sucessfull removing!');
};

/**
 * Delete a image from directory. By default does not delete thumbnail
 * @param {String} imagename Name of image
 * @param {Boolean} withThumbnail Specify if deleting thumbnail. By default false
 */
const deleteImage = async (imagename, withThumbnail = false) => {
  await deleteFile('../public', imagename);

  if (!withThumbnail) return;

  const imagenameThumbnail = fileSuffix(imagename, '_thumbnail');
  await deleteFile('../public', imagenameThumbnail);
};

const renderResponse = (res, view, data) => res.render(view, data);

/**
 * Upload file from temp to indicated directory
 * @param {String} directory Directory where file is uploaded
 * @param {File} file File to move from upload folder to indicated directory
 */
const uploadFile = async (directory, file) => {
  const filePath = path.join(__dirname, directory, file.filename);

  console.log(`Uploading ${file.path} to ${filePath}...`);
  await fse.copyFile(file.path, filePath);
  console.log('Sucessfull uploading!');
  await fse.remove(file.path);

  return filePath;
};

/**
 * Create thumbnail from image
 * @param {String} imagePath Path to original image
 */
const createThumbnail = async imagePath => {
  const thumbnailRequester = new cote.Requester({
    name: 'create thumbnail requester'
  });

  thumbnailRequester.send(
    {
      type: 'createThumbnail',
      image: path.join(__dirname, '../public', imagePath)
    },
    res => res
  );
};

/**
 * Upload image from temp to default image directory. By default does not create thumbnail
 * @param {File} image Image file to move from upload folder to default image folder
 * @param {Boolean} withThumbnail Specify if creating thumbnail. By default false
 */
const uploadImage = async (image, withThumbnail = false) => {
  const imagePath = await uploadFile('../public/images', image);

  if (!withThumbnail) return imagePath;

  await createThumbnail(imagePath);

  // return { imagePath, thumbnailPath };
  return imagePath;
};

module.exports = {
  createThumbnail,
  deleteFile,
  deleteImage,
  fileSuffix,
  renderResponse,
  uploadFile,
  uploadImage
};
