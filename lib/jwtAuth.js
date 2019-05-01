'use strict';

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = () => (req, res, next) => {
  // read token
  const { authorization } = req.headers;
  const token = authorization ? authorization.split(' ')[1] : false;
  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return next(err);
    }

    req.apiUserId = payload._id;
    next();
    return true;
  });
  return true;
};
