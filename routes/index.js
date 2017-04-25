let express = require('express');
let storage = require('../src/storage');
let url = require('url');
let particle_get = require('../src/particle-get');
let router = express.Router();

router.get(["/latest_cooling", "/latest_set_point", "/latest_temperature", "/latest_heating"], function(req, res) {
  var pathname = url.parse(req.url).pathname;
  console.log("endpoint called! - " + pathname);
  let deviceName = getDeviceName(req);

  if (deviceName != null) {
    let deviceID = particle_get.getDeviceIDFromName(deviceName);

    switch (pathname) {
      case "/latest_cooling":
        respond(res, storage.getLatestCooling(deviceID));
        break;
      case "/latest_set_point":
        respond(res, storage.getLatestSetPoint(deviceID));
        break;
      case "/latest_temperature":
        respond(res, storage.getLatestTemperature(deviceID));
        break;
      case "/latest_heating":
        respond(res, storage.getLatestHeating(deviceID));
        break;
      default:
        console.log("Can't get that data type!");
        errorState();
    }
  } else {
    errorState(res);
  }
});

router.post("/set_point", function(req, res) {
  console.log("endpoint called! - /set_point");

  let deviceName = getDeviceName(req);
  if (deviceName != null) {
    let deviceID = particle_get.getDeviceIDFromName(deviceName);

    particle_get.makeDeviceFunctionCall(deviceID, req.body["set_point"]);
  } else {
    errorState(res);
  }
});

function respond(res, obj) {
  let response = JSON.stringify(obj);
  res.contentType("application/json");
  res.status(200).send(response);
  res.end();
}

function errorState(res, err) {
  let response = JSON.stringify(err);
  res.contentType("application/json");
  res.status(500).send(response);
  res.end();
}

function getDeviceName(req) {
  if ("devicename" in req.query) {
    return req.query["devicename"].toLowerCase();
  } else if ("deviceName" in req.query) {
    return req.query["deviceName"].toLowerCase();
  } else  if ("DeviceName" in req.query) {
    return req.query["DeviceName"].toLowerCase();
  } else if ("device_name" in req.query) {
    return req.query["device_name"].toLowerCase();
  }

  return null;
}

module.exports = router;
