var fs = require("fs");
var storage = require("./storage");

var Particle = require("particle-api-js");
var particle = new Particle();
var accessToken = process.env.ACCESS_TOKEN;
var streamOpen = false;

var lastEventTimestamp = null;
const RETRY_PERIOD_MS = 3000;

updateDevices();
openEventStream();

function updateDevices() {
  let deviceList = particle.listDevices({auth: accessToken});
  deviceList.then(doneDeviceList, errorDeviceList);
}
function doneDeviceList (devices) {
  module.exports.deviceArray = devices.body;

  console.log("GOT DEVICES");
}
function errorDeviceList (err) {
  console.log("FAILED TO GET DEVICES - " + err.description);
  process.exit();
}

function restartStream(stream) {
  console.log("ended! re-opening in " + RETRY_PERIOD_MS + "ms...");
  streamOpen = false;

  if (stream != null) {
    // kill stream!
    stream.abort();
  }

  // configure stream to reopen
  setTimeout(openEventStream, RETRY_PERIOD_MS);
}

function openEventStream() {
  // only open one stream at a time
  if (streamOpen) {
    return;
  }

  particle.getEventStream({deviceId: "mine", auth: accessToken}).then(function(stream) {
    console.log("Stream opened!");

    streamOpen = true;

    stream.on("event", function(data) {
      lastEventTimestamp = Date.now();
      console.log("EVENT - " + data.name + " - DEVICE - " + data.coreid + " - TIME - " + data.published_at);
      handleRequest(data);
    });

    stream.on("error", function() {
      console.log("Stream could not reconnect, full connection reset...");
      stream = undefined;
      restartStream(null);
    });

  }, function(err) {
    setTimeout(function() {
      console.log("Could not open stream! retrying in " + RETRY_PERIOD_MS + "ms...");
    }, RETRY_PERIOD_MS);
  });
}

function handleRequest(data) {
  switch (data.name) {
    case "geometry.fermenter.temperature":
      storage.addLatestTemperature(data.coreid, data.data);
      break;
    case "geometry.fermenter.setpoint":
      storage.addLatestSetPoint(data.coreid, data.data);
      break;
    case "geometry.fermenter.heating":
      storage.addLatestHeating(data.coreid, data.data);
      break;
    case "geometry.fermenter.cooling":
      storage.addLatestCooling(data.coreid, data.data);
      break;
    default:
      console.log("EVENT UNHANDLED! : " + data.name);
  }
}

module.exports = {
  getDeviceIDFromName: function getDeviceIDFromName(name) {
    name = name.toLowerCase(); // convert as we don't want case sensitivity

    let deviceArray = module.exports.deviceArray;
    if (deviceArray == null) {
      return null;
    }
    for (let i = 0; i < deviceArray.length; i++) {
      let deviceName = deviceArray[i].name;
      if (deviceName == null) {
        console.log("ERROR: DEVICE UNNAMED!");
        continue;
      }
      let lowercaseTestName = deviceName.toLowerCase();
      if (lowercaseTestName == name) {
        return deviceArray[i].id;
      }
    }
    return null;
  },

  makeDeviceFunctionCall: function(deviceID, data) {
    // fire and forget function call
    particle.callFunction({deviceId: deviceID, name: "route", argument: data});
  }
};
