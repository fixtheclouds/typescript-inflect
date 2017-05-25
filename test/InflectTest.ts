/// <reference path="../typings/index.d.ts" />
/// <reference> node.d.ts
import Inflect from '../index';
import assert = require('assert');

describe('Inflect', () => {
  let subject: Inflect;

  beforeEach(() => {
    subject = new Inflect();
  });

  describe('#demodulize', () => {
    it('return last part of module string', () => {
      assert.equal('Module', subject.demodulize('Test::String::Module'));
    });
    it('returns the whole string if it`s not module string', () => {
      assert.equal('Something', subject.demodulize('Something'));
    });
  });

  describe('#camelize', () => {
    it('camelizes string', () => {
      assert.equal('TestString', subject.camelize('test_string'));
    });
    it('camelizes string with lower case first letter is told so', () => {
      assert.equal('testString', subject.camelize('Test_string', true));
    });
  });

  describe('#dasherize', () => {
    it('dasherizes string', () => {
      assert.equal('un-der-score', subject.dasherize('un_der_score'));
    });
  });
});
