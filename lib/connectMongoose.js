'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', error => {
    console.error('Connection error', error);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.info('Successfull connection to MongoDB on', mongoose.connection.name);
});

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost/nodepop', { useNewUrlParser: true });

module.exports = mongoose.connection;