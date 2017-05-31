/**
 * Mocha test suite for index.ts
 * TODO rewrite using dynamically generated
 */
/// <reference path="../typings/index.d.ts" />
/// <reference> node.d.ts
import Inflect from '../index';
import assert = require('assert');

describe('Inflect', () => {
  let subject = Inflect;

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

  describe('#underscore', () => {
    it('returns underscored string', () => {
      assert.equal('01_un_der_score', subject.underscore('01UnDerScore'));
    });
    it('returns underscored string', () => {
      assert.equal('dashed_string', subject.underscore('dashed-string'));
    });
    it('doesn`t change already underscore-compatible string', () => {
      assert.equal('test_string', subject.underscore('test_string'));
    });
  });

  describe('#pluralize', () => {
    it('pluralizes regular word', () => {
      assert.equal('words', subject.pluralize('word'));
    });
    it('doesn`t pluralize uncountable word', () => {
      assert.equal('deer', subject.pluralize('deer'));
    });
    it('doesn`t pluralize already plural', () => {
      assert.equal('matches', subject.pluralize('matches'));
    });
    it('pluralizes irregular word', () => {
      assert.equal('feet', subject.pluralize('foot'));
    });
    it('preserves word case', () => {
      assert.equal('Moles', subject.pluralize('Mole'));
    });
    it('respects uppercase', () => {
      assert.equal('ECHOES', subject.pluralize('ECHO'));
    });
  });

  describe('#singularize', () => {
    it('singularizes regular plural word', () => {
      assert.equal('shoe', subject.singularize('shoes'));
    });
    it('doesn`t singularize non-plural word', () => {
      assert.equal('dog', subject.singularize('dog'));
    });
    it('singularizes irregular word', () => {
      assert.equal('ox', subject.singularize('oxen'));
    });
    it('preserves uppercase', () => {
      assert.equal('FRIEND', subject.singularize('FRIENDS'));
    });
  });
});
