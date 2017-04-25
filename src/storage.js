let Device = require("./Device").Device;

let deviceDataArray = [];

function checkDeviceExists(deviceID) {
  if (deviceDataArray[deviceID] == null) {
    deviceDataArray[deviceID] = new Device(deviceID);
  }
}

module.exports = {
  devices: null,

  addLatestCooling: function(deviceID, cooling) {
    checkDeviceExists(deviceID);
    deviceDataArray[deviceID].addLatestCooling(cooling);
  },

  addLatestSetPoint: function(deviceID, setPoint) {
    checkDeviceExists(deviceID);
    deviceDataArray[deviceID].addLatestSetPoint(setPoint);
  },

  addLatestTemperature: function(deviceID, temperature) {
    checkDeviceExists(deviceID);
    deviceDataArray[deviceID].addLatestTemperature(temperature);
  },

  addLatestHeating: function(deviceID, heating) {
    checkDeviceExists(deviceID);
    deviceDataArray[deviceID].addLatestHeating(heating);
  },

  getLatestCooling: function(deviceID) {
    checkDeviceExists(deviceID);
    return deviceDataArray[deviceID].getLatestCooling();
  },

  getLatestSetPoint: function(deviceID) {
    checkDeviceExists(deviceID);
    return deviceDataArray[deviceID].getLatestSetPoint();
  },

  getLatestTemperature: function(deviceID) {
    checkDeviceExists(deviceID);
    return deviceDataArray[deviceID].getLatestTemperature();
  },

  getLatestHeating: function(deviceID) {
    checkDeviceExists(deviceID);
    return deviceDataArray[deviceID].getLatestHeating();
  }
};