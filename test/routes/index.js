const request = require('supertest');
const sinon = require('sinon');
const forecast = require('../../src/lib/forecast');

const app = require('../../src/index');

const agent = request.agent(app);

describe('Index Route', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('/', () => {
    it('returns html when specified format is html', function* () {
      const result = yield agent.get('/?format=html');

      expect(result.text.includes('<html>')).to.equal(true);
    });

    it('returns json when specified format is json', function* () {
      const result = yield agent.get('/?format=json');

      expect(result.body.message)
      .to.equal('Weather forecast app, please provide /weather/:CityName/:day');
    });
  });

  describe('/weather/', () => {
    it('returns html when specified format is html', function* () {
      const result = yield agent.get('/weather/?format=html');

      expect(result.text.includes('<html>')).to.equal(true);
    });

    it('returns html with error message when no location specified', function* () {
      const result = yield agent.get('/weather/?format=html');

      expect(result.text.includes('location is mandatory parameter')).to.equal(true);
    });

    it('returns json when specified format is json', function* () {
      const result = yield agent.get('/weather/?format=json');

      expect(result.body.err)
      .to.equal('location is mandatory parameter');
    });

    it('returns the json received from forecast api', function* () {
      const data = { sample: 'x' };
      const stub = sandbox.stub(forecast, 'get')
      .withArgs('Sydney', 'today')
      .returns(Promise.resolve(data));
      const result = yield agent.get('/weather/Sydney?format=json');

      expect(stub.calledOnce).to.equal(true);
      expect(result.body.sample).to.equal('x');
    });
  });
});
