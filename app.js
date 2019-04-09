'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const i18n = require('./lib/i18nConfigure')();

const { API_ROUTE } = process.env;

/**
 * Database connection
 */
const mongooseConnection = require('./lib/connectMongoose');
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
 * User session
 */
app.use(
  session({
    name: 'nodepop-session',
    secret: 'your-secret-env-file-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: 2 * 24 * 60 * 60 * 1000
    },
    store: new MongoStore({
      mongooseConnection
    })
  })
);

/**
 * API routes
 */
// Make an array in case you have several api versions
const apiRoute = API_ROUTE || 'api/v1/';

/**
 * Check is req is an API Request
 * @param {Request} req
 */
function isApiRequest(req) {
  return req.originalUrl.indexOf(apiRoute) === 0;
}

// TODO Crear apiController con rutas api
// const apiController = require('./routes/apiController');

app.use(`/${apiRoute}ads`, require('./routes/apiv1/ads'));
app.use(`/${apiRoute}tags`, require('./routes/apiv1/tags'));
const loginController = require('./routes/apiv1/loginController');

app.post(`/${apiRoute}authenticate`, loginController.post);

/**
 * Web routes
 */
const sessionAuth = require('./lib/sessionAuth');
app.use('/', require('./routes/index'));
app.use('/change-lang', require('./routes/change-lang'));
// app.get('/privado', sessionAuth(), privadoController.index);

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
