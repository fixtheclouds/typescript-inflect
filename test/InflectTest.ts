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
      let result: string = subject.demodulize('Test::String::Module');
      assert.equal('Module', result);
    });
    it('returns the whole string if it`s not module string', () => {
      let result: string = subject.demodulize('Something');
      assert.equal('Something', result);
    });
  });

});
