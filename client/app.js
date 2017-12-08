const express = require('express');
const exphbs  = require('express-handlebars');
const path    = require('path');
const favicon = require('serve-favicon');
const logger  = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');

var app = express();

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.set('views', './views');

app.engine('hbs', exphbs({
    defaultLayout: "main",
    extname: '.hbs',
    helpers: { json: function (context) { return JSON.stringify(context); } }
}));

app.set('view engine', '.hbs');

//routes
var routes = require('./routes.js')(app);

module.exports = app;
