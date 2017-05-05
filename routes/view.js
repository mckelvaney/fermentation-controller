let express = require("express");
let path = require("path");
let routerView = express.Router();

routerView.get("/", function(req, res) {
  res.sendFile(path.resolve("views/index.html"));
});

module.exports = routerView;
