var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var viewRoutes = require('./routes/view');

var app = express();
var versionOnePrefix = "/api/v1";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add headers
corsOptions = {
  "origin": "*",
  "methods": "GET, POST"
};
app.use(cors(corsOptions));

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(versionOnePrefix, routes);
app.use("/", viewRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
