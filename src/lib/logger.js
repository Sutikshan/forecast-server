const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'node-forecast',
  environment: process.env.NODE_ENV,
});

module.exports = logger;
