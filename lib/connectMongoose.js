'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const { MONGODB_URL } = process.env;

mongoose.connection.on('error', error => {
  console.error('Connection error', error);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Successfull connection to MongoDB on', mongoose.connection.name);
});

mongoose.set('useCreateIndex', true);

mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

module.exports = mongoose.connection;
