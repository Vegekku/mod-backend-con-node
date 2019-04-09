'use strict';

const bcrypt = require('bcrypt');
const User = require('../../models/User');

class LoginController {
  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      // user not found or invalid user
      if (!user || !(await bcrypt.compare(password, user.password))) {
        // res.locals.email = email;
        // res.locals.error = res.__('Invalid credentials');
        // res.render('login');
        return;
      }

      // authenticated user
      req.session.authUser = {
        _id: user._id
      };

      res.redirect('namedRoutes.privado');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LoginController();
