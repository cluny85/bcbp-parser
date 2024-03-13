const {
  BCBPStandard,
  paxStatusTypes,
  paxDetailsTypes,
  sourceCheckinTypes,
  sourceBPIssuer,
  documentTypes,
  documentVerificationTypes,
  classTypes
} = require('./dataset');
const { getJulianDate } = require('./julian');
const { getUTCDate } = require('./date');
const { hexToDec } = require('./utils');
const { isBagTag, parseBagTag } = require('./bagTag');

const hasConditionalFields = (barCode) => (barCode.length - 64 > 0);
const isValidBCBP = (barCode) => {
  const value = barCode.substring(0, 1).trim();
  return (value === 'M' && barCode.length > 58);
};

const cleanBCPValues = (BCP) => Object.fromEntries(Object.entries(BCP)
// eslint-disable-next-line no-unused-vars
  .filter(([_, value]) => value !== ''));

const getCodeMessage = (code, dataset) => {
  try {
    const key = (typeof code === 'string') ? code.toUpperCase() : code;
    return (dataset[code]) ? dataset[code] : code;
    // return {
    //   code,
    //   message: dataset[code],
    // };
  } catch (error) {
    return dataset.error;
  }
};

module.exports = {
  parseBCBP
};

function parseBCBP(barCode, UTCDate = false) {
  if (!barCode) return { error: 'Not a valid BCBP.' };
  if (isBagTag(barCode)) return parseBagTag(barCode);
  if (!isValidBCBP(barCode)) return { error: 'Not a valid BCBP.' };
  const hasConditionalData = barCode.length - 64 > 0;
  // the max standard iata input length,
  const maxStandardIata = 158;
  const result = {
    type: 'bcbp'
  };
  try {
    Object.keys(BCBPStandard).forEach((key) => {
      const { length, offset, content } = BCBPStandard[key];
      // TODO: add security params parser
      if (offset > maxStandardIata) return;
      const value = barCode.substring(offset - length, offset).trim();
      // console.log(`key: ${key} - value: ${value}`);

      switch (key) {
        case 'flight_date':
          result[key] = UTCDate ? getUTCDate(value) : getJulianDate(value);
          return;
        case 'compartment_code':
          result[key] = getCodeMessage(value, classTypes);
          return;
        case 'passenger_status':
          result[key] = getCodeMessage(value, paxStatusTypes);
          return;
        // Conditional block
        case 'passenger_details':
          result[key] = getCodeMessage(value, paxDetailsTypes);
          return;
        case 'source_checking':
          result[key] = getCodeMessage(value, sourceCheckinTypes);
          return;
        case 'boarding_pass_issue':
          result[key] = getCodeMessage(value, sourceBPIssuer);
          return;
        case 'date_pass_issue':
          result[key] = UTCDate ? getUTCDate(value) : getJulianDate(value);
          return;
        case 'document_type':
          result[key] = getCodeMessage(value, documentTypes);
          return;
        case 'doc_verification':
          result[key] = getCodeMessage(value, documentVerificationTypes);
          return;
        case 'baggage_allowance':
          result[key] = (value.length > 0) ? value : 0;
          return;
      }
      result[key] = value;

      // if (hasConditionalData) {}
    });
  } catch (error) {
    console.error(error);
    result.error = error.message;
  }
  return cleanBCPValues(result);
}
// const getConditionalBlock = (barCode) => {
//   const sizeBlock = 64;
//   // BCBPStandard.conditionals_size;
//   const block1 = hexToDec(barCode.substring(62, 64).trim());
//   const block2 = hexToDec(block1 + sizeBlock, (block1 + sizeBlock) + 2);
//   // const conditionalBlockLength = barCode.length - sizeBlock;
//   const conditionalBlock = barCode.substring(barCode.length - 60 , 60);
//   const conditionalBlock = barCode.substring(barCode.length - 60 , 60);

//   // let value = barCode.substring(offset - length, offset).trim();
// }
