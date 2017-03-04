const geocode = require('./geocode');
const http = require('./https');

const get = (cityName, day) => {
  const baseUri = `${process.env.FORECAST_BASEURL}/${process.env.SECRET_KEY}`;

  return geocode.get(cityName)
  .then((code) => {
    const uri = `${baseUri}/${code.lat},${code.lng}`;

    return http.get(uri);
  });
};

module.exports = {
  get,
};
