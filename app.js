'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const i18n = require('./lib/i18nConfigure')();
const jwtAuth = require('./lib/jwtAuth');

/**
 * Environment variables
 */
const { API_ROUTE } = process.env;

/**
 * Database connection
 */
require('./lib/connectMongoose');
require('./models/Ad');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Setup i18n
 */
app.use(i18n.init);

/**
 * Globals variable
 */
app.locals.title = 'Nodepop';

/**
 * API routes
 */
// TODO Make an array in case you have several api versions
const apiRoute = API_ROUTE || 'api/v1/';

/**
 * Check is req is an API Request
 * @param {Request} req
 */
function isApiRequest(req) {
  return req.originalUrl.indexOf(`/${apiRoute}`) === 0;
}

const loginController = require('./routes/apiv1/loginController');

app.post(`/${apiRoute}authenticate`, loginController.post);
app.use(`/${apiRoute}ads`, jwtAuth(), require('./routes/apiv1/ads'));
app.use(`/${apiRoute}tags`, jwtAuth(), require('./routes/apiv1/tags'));

/**
 * Web routes
 */
app.use('/', require('./routes/index'));
app.use('/change-lang', require('./routes/change-lang'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  // Show in log in case error 500
  if (err.status && err.status >= 500) console.error(err);

  // JSON response in case API request
  if (isApiRequest(req)) {
    console.error(err);
    res.json({ success: false, err });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
