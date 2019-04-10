'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const { JWT_SECRET } = process.env;

class LoginController {
  async post(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      // user not found
      if (!user || !await bcrypt.compare(password,user.password)) {
        res.json({
          success: false,
          error: res.__('Invalid credentials')
        });
        return;
      }

      // authenticated user
      const token = await jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '2d'
      });

      res.json({ success: true, token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LoginController();
