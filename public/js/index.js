var ENDPOINT = "api/v1/";
var deviceName = "matt-photon-1";

function makeEndpoint(point) {
  return window.location.href + ENDPOINT + point + "?device_name=" + deviceName;
}

function makePostCall(url, data, cb) {
  $.ajax({
    url: url,
    method: "POST",
    data: data,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function() {
      if (cb) {
        cb();
      }
    },
    error: function() {
    }
  });
}

function makeGetCall(url, cb) {
  $.ajax({
    url: url,
    method: "GET",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {
      cb(data);
    },
    error: function(err) {
      console.log("Oh noes! Can't get for some reason: " + err);
    }
  });
}

$(document).ready(function() {
  setInterval(function() {
    makeGetCall(makeEndpoint("latest_cooling"), function(cooling) {
      $("#cooling-output").val(cooling.value);
      $("#cooling-time-output").val(cooling.timestamp);
    });

    makeGetCall(makeEndpoint("latest_heating"), function(heating) {
      $("#heating-output").val(heating.value);
      $("#heating-time-output").val(heating.timestamp);
    });

    makeGetCall(makeEndpoint("latest_set_point"), function(setPoint) {
      $("#set-point-output").val(setPoint.value);
      $("#set-point-time-output").val(setPoint.timestamp);
    });

    makeGetCall(makeEndpoint("latest_temperature"), function(temperature) {
      $("#temperature-output").val(temperature.value);
      $("#temperature-time-output").val(temperature.timestamp);
    });
  }, 500);

  $("#set-point-btn").click(function() {
    makePostCall(makeEndpoint("set_point"), JSON.stringify({"set_point" : $("#set-point-input").val()}));
  });
});