const get = (date, day) => {
  if (day === 'today') {
    return date.getTime();
  }
  const ALLOWED_DAY_VALUES = [0, 1, 2, 3, 4, 5, 6];
  const d = parseInt(day, 10);

  if (!ALLOWED_DAY_VALUES.includes(d)) {
    throw new Error('incorrect day value supplied');
  }


  return date.setDate(date.getDate() + (d + 7 - date.getDay()) % 7);
};

module.exports = {
  get,
};
