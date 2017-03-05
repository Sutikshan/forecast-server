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
      const data = { daily: { data: [{ sample: 'x' }] } };
      sandbox.stub(forecast, 'get')
      .returns(Promise.resolve(data));

      const result = yield agent.get('/weather?format=html');

      expect(result.text.includes('<html>')).to.equal(true);
    });

    it('returns the json received from forecast api', function* () {
      const data = { daily: { data: [{ sample: 'x' }] } };
      const stub = sandbox.stub(forecast, 'get')
      .withArgs('Sydney', 'today')
      .returns(Promise.resolve(data));
      const result = yield agent.get('/weather/Sydney?format=json');

      expect(stub.calledOnce).to.equal(true);
      expect(result.body.sample).to.equal('x');
    });

    it('/weather?location=Perth&format=json returns', function* () {
      const data = { daily: { data: [{ sample: 'x', location: 'Perth' }] } };
      const stub = sandbox.stub(forecast, 'get')
      .withArgs('Perth', 'today')
      .returns(Promise.resolve(data));
      const result = yield agent.get('/weather?location=Perth&format=json');

      expect(stub.calledOnce).to.equal(true);
      expect(result.body.sample).to.equal('x');
    });

    it('/weather?location=Perth&day=3&format=json returns', function* () {
      const data = { daily: { data: [{ sample: 'x', location: 'Perth' }] } };
      const stub = sandbox.stub(forecast, 'get')
      .withArgs('Perth', '3')
      .returns(Promise.resolve(data));
      const result = yield agent.get('/weather?location=Perth&day=3&format=json');

      expect(stub.calledOnce).to.equal(true);
      expect(result.body.sample).to.equal('x');
    });

    it('/weather/Perth/3?format=json returns', function* () {
      const data = { daily: { data: [{ sample: 'x', location: 'Perth' }] } };
      const stub = sandbox.stub(forecast, 'get')
      .withArgs('Perth', '3')
      .returns(Promise.resolve(data));
      const result = yield agent.get('/weather/Perth/3?format=json');

      expect(stub.calledOnce).to.equal(true);
      expect(result.body.sample).to.equal('x');
    });

    it('/weather/Perth?format=json returns', function* () {
      const data = { daily: { data: [{ sample: 'x', location: 'Perth' }] } };
      const stub = sandbox.stub(forecast, 'get')
      .withArgs('Perth', 'today')
      .returns(Promise.resolve(data));
      const result = yield agent.get('/weather/Perth?format=json');

      expect(stub.calledOnce).to.equal(true);
      expect(result.body.sample).to.equal('x');
    });
  });
});
