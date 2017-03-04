const formatter = (req, res, next) => {
  res.format({
    'text/plain': () => {
      res.send(JSON.stringify(res.locals.data));
    },

    'text/html': () => {
      res.render(res.locals.view || 'index', res.locals.data);
    },

    'application/json': () => {
      res.send(res.locals.data);
    },

    default: () => {
      // log the request and respond with 406
      res.status(406).send(`${req.headers.accept} Not Acceptable`);
    },
  });
  next();
};

module.exports = formatter;
