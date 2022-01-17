var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var sequelize = require('./Utils/database')


//routers
var usersRouter = require('./routes/users');
var app = express();

// models
const User = require('./Models/user');

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', usersRouter)

// sequelize.sync({ force: true })
//     .then((result) => {
//   console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

module.exports = app;