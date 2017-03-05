const guard = require('require-guard');
const chai = require('chai');
require('mocha');
require('co-mocha');

guard(module.id);

process.env.NODE_ENV = 'test';
process.env.PORT = 6170;

global.expect = chai.expect;
global.assert = chai.assert;
