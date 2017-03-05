const nextWeekDay = require('../../src/lib/nextWeekDay');

describe('getNextWeekDay', () => {
  const date = new Date(2017, 2, 5); // 5th March 2017 was sunday

  it('gives next monday if day is given 1', () => {
    const nextMonday = nextWeekDay.get(date, 1);

    expect(nextMonday).to.equal(new Date(2017, 2, 6).getTime());
  });

  it('gives next tuesday if day is given 2', () => {
    const nextTuesday = nextWeekDay.get(date, '2');

    expect(nextTuesday).to.equal(new Date(2017, 2, 7).getTime());
  });
  it('gives next wednesday if day is given 3', () => {
    const nextTuesday = nextWeekDay.get(date, 3);

    expect(nextTuesday).to.equal(new Date(2017, 2, 8).getTime());
  });
  it('gives next sunday if day is given 0', () => {
    const nextTuesday = nextWeekDay.get(date, 0);

    expect(nextTuesday).to.equal(new Date(2017, 2, 12).getTime());
  });
  it('gives today if day is given today', () => {
    const today = nextWeekDay.get(date, 'today');

    expect(today).to.equal(date.getTime());
  });

  it('throws exception given wrong day value', () => {
    let err = null;
    try {
      nextWeekDay.get(date, 'xxxx');
    } catch (ex) {
      err = ex;
    }
    expect(err.message).to.equal('incorrect day value supplied');
  });
});
