var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jsonwebtoken = require("jsonwebtoken")

// APP REQ
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var textRouter = require('./routes/text')
const categoriesRouter = require("./routes/categories")

var app = express();

app.set("secretKey", "123")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// APP USE - POSTMAN GET POINT
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/products', verifyToken, productRouter )
app.use('/text', textRouter)
app.use('/categories', categoriesRouter)

function verifyToken(req, res, next) {
  const authToken = req.headers["authorization"]

  if(!authToken) {
    return res.status(401).json({message: "Token must be provided"});
  }

  const token = authToken.split(" ")[1]

  jsonwebtoken.verify(token, req.app.get("secretKey"), function(error, payload) {
    if(error) {
      return res.status(401).json({message: error.message})
    } else {
      console.log(payload)
      next()
    }
  });
}

app.verifyToken = verifyToken;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
