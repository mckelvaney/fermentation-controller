const DATA_POINTS_TO_KEEP_MAX = 1000;

function PieceOfData(data) {
  this.value = data;
  this.timestamp = new Date().getTime();
}

function Device(deviceID) {
  this.deviceID = deviceID;
  this.cooling = [];
  this.setPoint = [];
  this.temperature = [];
  this.heating = [];
}

Device.prototype.addValue = function(dataType, value) {
  this[dataType].unshift(new PieceOfData(value));
  if (this[dataType].length > DATA_POINTS_TO_KEEP_MAX) {
    this[dataType].slice(0, DATA_POINTS_TO_KEEP_MAX);
  }
};

Device.prototype.addLatestCooling = function(cooling) {
  this.addValue("cooling", cooling);
};

Device.prototype.addLatestSetPoint = function(setPoint) {
  this.addValue("setPoint", setPoint);
};

Device.prototype.addLatestTemperature = function(temperature) {
  this.addValue("temperature", temperature);
};

Device.prototype.addLatestHeating = function(heating) {
  this.addValue("heating", heating);
};

Device.prototype.getLatestCooling = function() {
  return this.cooling[0];
};

Device.prototype.getLatestSetPoint = function() {
  return this.setPoint[0];
};

Device.prototype.getLatestTemperature = function() {
  return this.temperature[0];
};

Device.prototype.getLatestHeating = function() {
  return this.heating[0];
};

module.exports = {
  Device: Device
};