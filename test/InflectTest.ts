/**
 * Mocha test suite for index.ts
 * TODO rewrite using dynamically generated tests
 */
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

  describe('#ordinal', () => {
    beforeEach(() => {
      this.number = Math.floor(Math.random());
    });

    it('returns `st` number suffix', () => {
      assert.equal('st', subject.ordinal(this.number * 10 + 1));
    });
    it('returns `nd` number suffix', () => {
      assert.equal('nd', subject.ordinal(this.number * 10 + 2));
    });
    it('return `rd` number suffix', () => {
      assert.equal('rd', subject.ordinal(this.number * 10 + 3));
    });
    it('return `th` number suffix', () => {
      assert.equal('th', subject.ordinal(this.number * 100 + 13));
    });
  });

  describe('#ordinalize', () => {
    it('returns number with `st` suffix', () => {
      assert.equal(`321st`, subject.ordinalize(321));
    });
    it('returns number with `nd` suffix', () => {
      assert.equal('7002nd', subject.ordinalize(7002));
    });
    it('returns number with `rd` suffix', () => {
      assert.equal('33rd', subject.ordinalize(33));
    });
    it('returns number with `th` suffix', () => {
      assert.equal('555th', subject.ordinalize(555));
    });
  });
});
