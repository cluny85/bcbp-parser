const { expect } = require('chai');
const { parseBCBP } = require('../lib/bcbp');

const mock = {
  bcbp1: 'M1PADRONGOMEZ/CARLO   EK51KC  MADSPCIB 3842 117N016B0109 14B>5181WM8117BIB              2A0752376813598 2   IB IB00000000           8  ',
  bcbp2: 'M1ASKREN/TEST         EA272SL ORDNRTUA 0881 007F002K0303 15C>3180 K6007BUA              2901624760758980 UA UA EY975897            *30600    09  UAG    ',
  bcbp3: 'M1RIVERACARDENAS/YEL  ENP5EY  MADSJOIB 6317 031N034A0076 14B>5182WM2030BIB              2A0757652331574 2                              ',
  bcbp4: 'M1ZAMBRANOHIDALGO/ANDR 3NFDR3 ALCLBALS 0272 067H029F0188 35D>5180 O    BLS              2A             0 LS                        N 21198614920   '
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

    it('must return formated json object with UTC dates, and skip date_pass_issue because is empty', () => {
      const result = parseBCBP(mock.bcbp4, true);
      const keys = ['type', 'format_code',
        'legs', 'passenger',
        'pnr', 'origin',
        'destination', 'airline',
        'flight_number', 'flight_date',
        'compartment_code', 'seat',
        'checkin_number', 'passenger_status',
        'conditional_size', 'init_version_number',
        'version_number', 'conditionals_size',
        'passenger_details', 'boarding_pass_issue',
        'document_type', 'airline_issuer',
        'bagtag_second', 'marketing_carrier',
        'frequent_flyer_airline', 'frequent_flyer_number',
        'baggage_allowance'
      ];
      expect(result).to.include.keys(keys);
      Object.keys(keys).forEach((item) => {
        expect(item).to.not.be.eq(undefined);
      });
      expect(result).not.to.include.keys(['date_pass_issue']);
      const currentYear = new Date().getFullYear();
      expect(result.flight_date.getFullYear()).to.be.greaterThanOrEqual(currentYear);
    });
  });
});
