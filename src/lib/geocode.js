const https = require('./https');

const get = (address) => {
  const baseUri = process.env.GOOGLE_MAPSAPI_URL;
  const key = process.env.GOOGLE_API_KEY;
  const url = `${baseUri}?address=${address}&key=${key}`;

  return https.get(url).then((l) => ({
    lng: l.results[0].geometry.location.lng,
    lat: l.results[0].geometry.location.lat,
  }));
};

module.exports = {
  get,
};
