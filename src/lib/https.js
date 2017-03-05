const https = require('https');
const logger = require('./logger');

const get = (uri) => new Promise((resolve, reject) => {
  https.get(
  uri,
  (response) => {
    const statusCode = response.statusCode;
    if (statusCode !== 200) {
      logger.error(statusCode, response.body);

      reject(new Error(response.statusCode));
    }

    response.setEncoding('utf8');
    let body = '';

    response.on('data', (d) => {
      body += d;
    });

    response.on('end', () => {
      const parsed = JSON.parse(body);

      resolve(parsed);
    });
  }).on('error', (e) => {
    logger.error(e);
    reject(new Error(e));
  });
});

module.exports = {
  get,
};
