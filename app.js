'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

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
 * Globals variable
 */
app.locals.title = 'Nodepop';

/**
 * API routes
 */
// Make an array in case you have several api versions
const apiRoute = '/api/v1';

/**
 * Check is req is an API Request
 * @param {Request} req
 */
function isApiRequest(req) {
  return req.originalUrl.indexOf(apiRoute) === 0;
}

app.use(`${apiRoute}/ads`, require('./routes/apiv1/ads'));
app.use(`${apiRoute}/tags`, require('./routes/apiv1/tags'));

/**
 * Web routes
 */
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Show in log in case error 500
  if (err.status && err.status >= 500) console.error(err);

  // JSON response in case API request
  if (isApiRequest(req)) {
    res.json({ success: false, err });
    return;
  }

  // render the error page
  res.render('error');
});

module.exports = app;
