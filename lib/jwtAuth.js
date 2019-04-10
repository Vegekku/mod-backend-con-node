'use strict';

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = () => (req, res, next) => {
  // read token
  const token = req.body.token || req.query.token || req.get('Authorization');

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: 'No token provided,' });
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return next(err);
    }

    req.apiUserId = payload._id;
    next();
    return 1;
  });
  return 1;
};
