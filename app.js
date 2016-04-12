var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session); //为了适用老版本（0.10.x 0.12.x）的node，适用es5的标准
var bodyParser = require('body-parser');
var _ = require('lodash');

var router = require('./router.js');
var config = require('./config.js');
var auth = require('./mid/auth.js');

var app = express();

// view engine setup
// 使用ejs模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = 'layout.html';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));// http请求log中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config.session_secret,
  store: new MongoStore({
    url:config.db
  }),
  resave: true,
  saveUninitialized: true
}));

//静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

_.extend(app.locals, {config:config});

app.use(auth.authUser);

//路由
app.use('/', router);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
