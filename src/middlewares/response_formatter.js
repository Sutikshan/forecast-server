const formatter = (req, res) => {
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
  });
  res.end();
};

module.exports = formatter;
