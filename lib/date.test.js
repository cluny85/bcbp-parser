const { expect } = require('chai');
const { getNormalDate } = require('./date');

describe('[unit] lib', () => {
  describe('getNormalDate', () => {
    it('must return 31th of january', () => {
      const date = getNormalDate('031');
      const currentYear = new Date().getFullYear();
      expect(date.getFullYear()).to.be.greaterThanOrEqual(currentYear);
      expect(date.getMonth()).to.be.eq(0);
      expect(date.getDate()).to.be.eq(31);
    });
    it('must return 31th or 30th of december', () => {
      const date = getNormalDate('7365');
      const currentYear = new Date().getFullYear();
      const lastDigit = date.getFullYear().toString().substring(3, 4);
      expect(lastDigit).to.be.eq('7');
      expect(date.getFullYear()).to.be.greaterThanOrEqual(currentYear);
      expect(date.getMonth()).to.be.eq(11);
      if (date.getFullYear() % 4) {
        expect(date.getDate()).to.be.eq(31);
      } else {
        // leap year
        expect(date.getDate()).to.be.eq(30);
      }
    });
  });
});
