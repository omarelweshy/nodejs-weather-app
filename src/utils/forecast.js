const request = require("postman-request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=31769b875d6e1297297ec81b1f133309&query=" +
    latitude +
    "," +
    longtitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
      console.log();
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(undefined, body.current.temperature);
    }
  });
};

module.exports = forecast;
