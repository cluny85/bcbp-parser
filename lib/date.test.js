const { expect } = require('chai');
const sinon = require('sinon');
const { getUTCDate } = require('./date');

describe('[unit] lib', () => {
  let clock;
  before(() => {
    clock = sinon.useFakeTimers({
      now              : new Date(2023, 6, 1, 0, 0), // 2023-07-01 - 182nth day of year
      shouldAdvanceTime: true,
      toFake           : ['Date']
    });
  });
  after(() => {
    clock.restore();
  });
  describe('getUTCDate', () => {
    it('must return 7th of july of the current year', () => {
      const date = getUTCDate('250');
      expect(date.toISOString()).to.be.eq('2023-09-07T00:00:00.000Z');
    });
    it('must return 31th of january of the next year', () => {
      const date = getUTCDate('031');
      expect(date.toISOString()).to.be.eq('2024-01-31T00:00:00.000Z');
    });
    it('must return 30th of june of the next year ', () => {
      const date = getUTCDate('181');
      date.toISOString();
      expect(date.toISOString()).to.be.eq('2024-06-30T00:00:00.000Z');
    });
    it('must return 1th of july of the current year ', () => {
      const date = getUTCDate('182');
      date.toISOString();
      expect(date.toISOString()).to.be.eq('2023-07-01T00:00:00.000Z');
    });
    it('must return 2th of july of the current year ', () => {
      const date = getUTCDate('183');
      date.toISOString();
      expect(date.toISOString()).to.be.eq('2023-07-02T00:00:00.000Z');
    });
    it('must return 1th of january of the next year ', () => {
      const date = getUTCDate('3001');
      date.toISOString();
      expect(date.toISOString()).to.be.eq('2024-01-01T00:00:00.000Z');
    });
    it('must return 31th of december of 2027 ', () => {
      const date = getUTCDate('7365');
      date.toISOString();
      expect(date.toISOString()).to.be.eq('2027-12-31T00:00:00.000Z');
    });
  });
});
