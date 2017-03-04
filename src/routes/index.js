const express = require('express');
const forecast = require('../lib/forecast');
const router = express.Router(); // eslint-disable-line

router.get('/', (req, res, next) => {
  next();
});

router.get('/weather/:location*?/:day*?', (req, res, next) => {
  const location = req.query.location || req.params.location;
  const day = req.query.day || req.params.day || 'today';

  if (!location) {
    res.status(422).send({ msg: 'location is mandatory parameter' });
    return;
  }

  forecast.get(location, day)
  .then(data => {
    res.locals.data = data; // eslint-disable-line
    res.locals.view = 'index'; // eslint-disable-line

    next();
  }).catch(err => {
    res.status(400).send({ msg: `unexpected error${err}` });
  });
});


module.exports = router;
