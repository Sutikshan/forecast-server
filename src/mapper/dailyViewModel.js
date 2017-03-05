const get = (darkSkyModel, location, day) => {
  const daily = darkSkyModel.daily.data[0];

  return {
    location,
    day,
    datetime: new Date(daily.time * 1000),
    summary: daily.summary,
    temperatureMax: daily.temperatureMax,
    temperatureMin: daily.temperatureMin,
    sunriseTime: new Date(daily.sunriseTime * 1000),
    sunsetTime: new Date(daily.sunsetTime * 1000),
  };
};

module.exports = {
  get,
};
