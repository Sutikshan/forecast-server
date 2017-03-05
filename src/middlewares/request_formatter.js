const formatter = (req, res, next) => {
  const format = req.query.format;

  switch (format) {
    case 'json':
      req.headers.accept = `application/${format}`;  // eslint-disable-line
      break;
    case 'html':
    case 'plain':
      req.headers.accept = `text/${format}`;  // eslint-disable-line
      break;
    default:
      req.headers.accept = 'text/html';  // eslint-disable-line

  }
  next();
};

module.exports = formatter;
