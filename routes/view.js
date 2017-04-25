let express = require("express");
let path = require("path");
let routerView = express.Router();

routerView.get("/", function(req, res) {
  console.log("Page access! (Main page)");
  res.sendFile(path.resolve("views/index.html"));
});

module.exports = routerView;