const sinon = require('sinon');
const geocode = require('../../src/lib/geocode');
const https = require('../../src/lib/https');
const forecast = require('../../src/lib/forecast');
const nextWeekDay = require('../../src/lib/nextWeekDay');

describe('Forecast lib', () => {
  describe('get', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
      sandbox.restore();
    });


    const getForecastUri = (code) => {
      process.env.FORECAST_BASEURL = 'https://example.com';
      process.env.SECRET_KEY = 'key';

      const exclude = 'exclude=currently,minutely,hourly,flags';
      const units = 'units=si';
      const baseUri = `${process.env.FORECAST_BASEURL}/${process.env.SECRET_KEY}`;
      const timeMsec = nextWeekDay.get(new Date(), 'today');
      sandbox.stub(nextWeekDay, 'get').returns(timeMsec);
      const timeSec = parseInt(timeMsec / 1000, 10);

      return `${baseUri}/${code.lat},${code.lng},${timeSec}?${exclude}&${units}`;
    };

    it('calls google geocode api with given cityName', function* () {
      const cityName = 'Sydney';
      const code = { lng: 1, lat: 1 };
      const expectedData = { summary: 'rain' };

      const geoStub = sandbox.stub(geocode, 'get')
      .withArgs(cityName)
      .returns(Promise.resolve(code));

      const httpStub = sandbox.stub(https, 'get')
      .returns(Promise.resolve(expectedData));

      const result = yield forecast.get(cityName, 'today');

      expect(geoStub.calledOnce).to.equal(true);
      expect(httpStub.calledOnce).to.equal(true);
      expect(result).to.equal(expectedData);
    });

    it('calls forecast api with given long-lat', function* () {
      const code = { lng: 1, lat: 1 };
      const expectedUri = getForecastUri(code);
      const cityName = 'Sydney';
      const expectedData = { summary: 'rain' };

      const geoStub = sandbox.stub(geocode, 'get')
      .withArgs(cityName)
      .returns(Promise.resolve(code));

      const httpStub = sandbox.stub(https, 'get')
      .withArgs(expectedUri)
      .returns(Promise.resolve(expectedData));

      const result = yield forecast.get(cityName, 'today');

      expect(geoStub.calledOnce).to.equal(true);
      expect(httpStub.calledOnce).to.equal(true);
      expect(result).to.equal(expectedData);
    });
  });
});
