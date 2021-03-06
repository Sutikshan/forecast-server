const geocode = require('./geocode');
const https = require('./https');
const nextWeekDay = require('./nextWeekDay');
const logger = require('./logger');

const getSeconds = (ms) =>
  parseInt(ms / 1000, 10);

const get = (cityName, day) => {
  const time = getSeconds(nextWeekDay.get(new Date(), day));

  const baseUri = `${process.env.FORECAST_BASEURL}/${process.env.SECRET_KEY}`;
  const exclude = 'exclude=currently,minutely,hourly,flags';
  const units = 'units=si';

  return geocode.get(cityName)
  .then((code) => {
    const uri = `${baseUri}/${code.lat},${code.lng},${time}?${exclude}&${units}`;

    logger.info('queried forecast service', uri);
    return https.get(uri);
  });
};

module.exports = {
  get,
};
