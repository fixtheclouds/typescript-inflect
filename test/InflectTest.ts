/**
 * Mocha test suite for index.ts
 */
/// <reference path="../typings/index.d.ts" />
/// <reference> node.d.ts
import Inflect from '../index';
import assert = require('assert');

describe('Inflect', () => {
  let subject = Inflect;

  describe('#demodulize', () => {
    const tests = [
      { arg: 'Test::String::Module', expected: 'Module' },
      { arg: 'Something', expected: 'Something' },
      { arg: '::Word', expected: 'Word' }
    ];

    tests.forEach((test) => {
      it(`demodulizes '${test.arg}'`, () => {
        assert.equal(test.expected, subject.demodulize.call(subject, test.arg));
      });
    });
  });

  describe('#camelize', () => {
    const tests = [
      { args: ['product.name', false], expected: 'ProductName' },
      { args: ['test_string', false], expected: 'TestString' },
      { args: ['Test_string', true], expected: 'testString' }
    ];

    tests.forEach((test) => {
      it(`camelizes '${test.args[0]}' with lowercase first letter = '${test.args[1]}'`, () => {
        assert.equal(test.expected, subject.camelize.apply(subject, test.args));
      });
    });
  });

  describe('#dasherize', () => {
    it('dasherizes string', () => {
      assert.equal('un-der-score', subject.dasherize('un_der_score'));
    });
  });

  describe('#ordinal', () => {
    const number = Math.floor(Math.random() * 100) * 100;
    const tests = [
      { arg: number + 1, expected: 'st' },
      { arg: number + 2, expected: 'nd' },
      { arg: number + 3, expected: 'rd' },
      { arg: number + 13, expected: 'th' }
    ]

    tests.forEach((test) => {
      it(`returns ${test.arg} number suffix`, () => {
        assert.equal(test.expected, subject.ordinal.call(subject, test.arg));
      });
    });
  });

  describe('#ordinalize', () => {
    const tests = [
      { arg: 321, expected: '321st' },
      { arg: 7002, expected: '7002nd' },
      { arg: 33, expected: '33rd' },
      { arg: 555, expected: '555th' }
    ]

    tests.forEach((test) => {
      it(`return ${test.arg} number with '${test.expected}'' suffix`, () => {
        assert.equal(test.expected, subject.ordinalize.call(subject, test.arg));
      });
    });
  });

  describe('#underscore', () => {
    const tests = [
      { arg: '01UnDerScore', expected: '01_un_der_score' },
      { arg: 'dashed-string', expected: 'dashed_string' },
      { arg: 'test_string', expected: 'test_string' }
    ]

    tests.forEach((test) => {
      it(`return underscored '${test.arg}' string`, () => {
        assert.equal(test.expected, subject.underscore.call(subject, test.arg));
      });
    });
  });

  describe('#pluralize', () => {
    const tests = [
      { arg: 'word', expected: 'words' },
      { arg: 'deer', expected: 'deer' },
      { arg: 'matches', expected: 'matches' },
      { arg: 'foot', expected: 'feet' },
      { arg: 'Mole', expected: 'Moles' },
      { arg: 'ECHO', expected: 'ECHOES' },
      { arg: 'this', expected: 'these' }
    ]

    tests.forEach((test) => {
      it(`pluralizes word '${test.arg}'`, () => {
        assert.equal(test.expected, subject.pluralize.call(subject, test.arg));
      });
    });
  });

  describe('#singularize', () => {
    const tests = [
      { arg: 'shoes', expected: 'shoe' },
      { arg: 'dog', expected: 'dog' },
      { arg: 'oxen', expected: 'ox' },
      { arg: 'sheep', expected: 'sheep' },
      { arg: 'FRIENDS', expected: 'FRIEND' }
    ]

    tests.forEach((test) => {
      it(`singularizes word '${test.arg}'`, () => {
        assert.equal(test.expected, subject.singularize.call(subject, test.arg));
      });
    });
  });

  describe('#classify', () => {
    it('classifies string with dots', () => {
      assert.equal('Property', subject.classify('product.properties'));
    });
    it('classifies string with underscores', () => {
      assert.equal('WordProblem', subject.classify('word_problems'));
    });
  });
});
