var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var bodyParser = require('body-parser');

var cardRouter = require('./routes/card');
var webhookRouter = require('./routes/webhook');
var userRouter = require('./routes/user');

global.dotenv = require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});

global._messages = require('./helpers/messages');
console.log(process.env.NODE_ENV);
var app = express();

// Database Connections!!!
var conn = require('./database');
global.con = conn;

//To allow cross-origin requests
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var checkJwtAuthentication = require('./middleware/authentication');


app.use('/card', checkJwtAuthentication, cardRouter);
app.use('/webhook', webhookRouter);
app.use('/user', checkJwtAuthentication, userRouter);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
