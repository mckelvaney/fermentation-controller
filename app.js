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

// catch any application errors
app.use(function (err, req, res, next) {
  console.log(err.stack)
  res.status(500).send('Internal error');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('Error: Not found - %s', req.originalUrl);
  res.status(404).send('Not found!');
});

module.exports = app;
