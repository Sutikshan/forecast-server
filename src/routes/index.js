const express = require('express');
const forecast = require('../lib/forecast');
const router = express.Router(); // eslint-disable-line

router.get('/', (req, res, next) => {
  res.locals.data = { // eslint-disable-line
    message: 'Weather forecast app, please provide /weather/:CityName/:day',
  };
  next();
});

router.get('/weather/:location*?/:day*?', (req, res, next) => {
  const location = req.query.location || req.params.location;
  const day = req.query.day || req.params.day || 'today';

  if (!location) {
    res.status(422);
    res.locals.data = { err: 'location is mandatory parameter' };
    return next();
  }

  forecast.get(location, day)
  .then(data => {
    res.locals.data = data; // eslint-disable-line
    res.locals.view = 'index'; // eslint-disable-line

    next();
  }).catch(err => {
    res.locals.data = { err: `unexpected error${err}` };
    res.status(400);
    next();
  });
});


module.exports = router;
