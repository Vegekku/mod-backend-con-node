'use strict';

/**
 * Middleware to check an authenticated user.
 * Verify session with user data, if not logged redirect to login
 */

const namedRoutes = require('../lib/namedRoutes');

module.exports = () => {
  return (req, res, next) => {
    if (!req.session.authUser) {
      res.redirect(namedRoutes.api.login);
      return;
    }
    next();
  };
};
