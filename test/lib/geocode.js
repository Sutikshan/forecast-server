const sinon = require('sinon');
const geocode = require('../../src/lib/geocode');
const https = require('../../src/lib/https');

describe('geocode lib', () => {
  describe('get', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
      sandbox.restore();
    });


    const getGoogleMapsUri = (city) => {
      process.env.GOOGLE_MAPSAPI_URL = 'https://example.com';
      process.env.GOOGLE_API_KEY = 'key';

      const baseUri = `${process.env.GOOGLE_MAPSAPI_URL}`;

      return `${baseUri}?address=${city}&key=key`;
    };

    it('calls google geocode api with given cityName', function* () {
      const cityName = 'Sydney';
      const expectedData = { results: [{ geometry: {
        location: { lng: 1, lat: 1 } } }] };

      const expectedUrl = getGoogleMapsUri(cityName);
      const httpStub = sandbox.stub(https, 'get')
      .withArgs(expectedUrl)
      .returns(Promise.resolve(expectedData));

      const result = yield geocode.get(cityName);

      expect(httpStub.calledOnce).to.equal(true);
      expect(result).to.deep.equal({ lng: 1, lat: 1 });
    });
  });
});
