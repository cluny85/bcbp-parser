const { expect } = require('chai');
const sinon = require('sinon');
const { getNormalDate } = require('./date');

describe('[unit] lib', () => {
  let clock;
  before(() => {
    clock = sinon.useFakeTimers({
      now              : new Date(2023, 6, 1, 0, 0),
      shouldAdvanceTime: true,
      toFake           : ['Date']
    });
  });
  after(() => {
    clock.restore();
  });
  describe('getNormalDate', () => {
    it('must return 7th of july of the current year', () => {
      const date = getNormalDate('250');
      expect(date.toISOString()).to.be.eq('2023-09-07T00:00:00.000Z');
    });
    it('must return 31th of january of the next year', () => {
      const date = getNormalDate('031');
      expect(date.toISOString()).to.be.eq('2024-01-31T00:00:00.000Z');
    });
    it('must return 31th of december of 2027 ', () => {
      const date = getNormalDate('7365');
      date.toISOString();
      expect(date.toISOString()).to.be.eq('2027-12-31T00:00:00.000Z');
    });
  });
});
