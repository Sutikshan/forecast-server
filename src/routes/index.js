const express = require('express');
const forecast = require('../lib/forecast');
const logger = require('../lib/logger');
const dailyViewModel = require('../mapper/dailyViewModel');

const router = express.Router(); // eslint-disable-line
/* eslint no-param-reassign: 0 */

router.get('/', (req, res, next) => {
  res.locals.data = {
    message: 'Weather forecast app, please provide /weather/:CityName/:day',
  };
  next();
});

const getForecast = (location, day, req, res, next) => {
  forecast.get(location, day)
  .then(data => {
    res.locals.data = dailyViewModel.get(data, location, day);
    res.locals.view = 'index';
    next();
  }).catch(err => {
    logger.error(err);
    res.locals.data = { err: `unexpected error ${err}` };
    res.status(400);
    next();
  });
};

router.get('/weather/:location/:day', (req, res, next) => {
  getForecast(req.params.location, req.params.day, req, res, next);
});

router.get('/weather/:location', (req, res, next) => {
  getForecast(req.params.location, 'today', req, res, next);
});

router.get('/weather', (req, res, next) => {
  const location = req.query.location || 'Sydney';
  const day = req.query.day || 'today';

  getForecast(location, day, req, res, next);
});


module.exports = router;
