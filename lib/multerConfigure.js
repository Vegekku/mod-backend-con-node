'use strict';

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public')),
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop();
    let path = '';
    switch (extension) {
      case 'png':
      case 'jpg':
      case 'gif':
        path = `/images/${Date.now()}.${extension}`;
        break;
      default:
        path = `/others/${Date.now()}.${extension}`;
    }
    cb(null, path);
  }
});

module.exports = multer({ storage });
