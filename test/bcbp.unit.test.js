const { expect } = require('chai');
const { parseBCBP } = require('../lib/bcbp');

const mock = {
  bcbp1: 'M1PADRONGOMEZ/CARLO   EK51KC  MADSPCIB 3842 117N016B0109 14B>5181WM8117BIB              2A0752376813598 2   IB IB00000000           8  ',
  bcbp2: 'M1ASKREN/TEST         EA272SL ORDNRTUA 0881 007F002K0303 15C>3180 K6007BUA              2901624760758980 UA UA EY975897            *30600    09  UAG    ',
  bcbp3: 'M1RIVERACARDENAS/YEL  ENP5EY  MADSJOIB 6317 031N034A0076 14B>5182WM2030BIB              2A0757652331574 2                              '
};

describe('[unit] bcbp', () => {
  describe('.parseBCBP', () => {
    it('must return formated json object', () => {
      const result = parseBCBP(mock.bcbp1);
      const keys = ['passenger', 'pnr', 'origin', 'destination',
        'airline', 'flight_number', 'flight_date', 'seat', 'checkin_number'];
      expect(result).to.include.keys(keys);
      Object.keys(keys).forEach((item) => {
        expect(item).to.not.be.eq(undefined);
      });
    });
    it('must return formated json object', () => {
      const result = parseBCBP(mock.bcbp2);
      const keys = ['passenger', 'pnr', 'origin', 'destination',
        'airline', 'flight_number', 'flight_date', 'seat', 'checkin_number'];
      expect(result).to.include.keys(keys);
      Object.keys(keys).forEach((item) => {
        expect(item).to.not.be.eq(undefined);
      });
    });

    it('must return formated json object with UTC dates', () => {
      const result = parseBCBP(mock.bcbp3, true);
      const keys = ['passenger', 'pnr', 'origin', 'destination',
        'airline', 'flight_number', 'flight_date', 'seat', 'checkin_number', 'flight_date', 'date_pass_issue'];
      expect(result).to.include.keys(keys);
      Object.keys(keys).forEach((item) => {
        expect(item).to.not.be.eq(undefined);
      });
      const currentYear = new Date().getFullYear();
      expect(result.flight_date.getFullYear()).to.be.greaterThanOrEqual(currentYear);
      expect(result.date_pass_issue.getFullYear()).to.be.greaterThanOrEqual(currentYear);
    });
  });
});
