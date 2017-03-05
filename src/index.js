const express = require('express');

const routes = require('./routes');
const logger = require('./lib/logger');
const reqFormatter = require('./middlewares/request_formatter');
const resFormatter = require('./middlewares/response_formatter');

const app = express();
const PORT = process.env.PORT || 6169;
const {
  version,
} = require('../package.json');

app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(reqFormatter);
app.use('/', routes);
app.use(resFormatter);


const server = app.listen(PORT, () => {
  logger.info(`FORECAST Service ${version}`);
  logger.info(`Now listening on ${PORT}`);
});

module.exports = server;
