'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true, index: true },
  password: String
});

userSchema.statics.hashPassword = plainPassword =>
  bcrypt.hash(String(plainPassword), 10);

const User = mongoose.model('User', userSchema);

module.exports = User;
