'use strict';

var _require = require('./dataset'),
    BCBPStandard = _require.BCBPStandard,
    paxStatusTypes = _require.paxStatusTypes,
    paxDetailsTypes = _require.paxDetailsTypes,
    sourceCheckinTypes = _require.sourceCheckinTypes,
    sourceBPIssuer = _require.sourceBPIssuer,
    documentTypes = _require.documentTypes,
    documentVerificationTypes = _require.documentVerificationTypes,
    classTypes = _require.classTypes;

var _require2 = require('./julian'),
    getJulianDate = _require2.getJulianDate;

var _require3 = require('./utils'),
    hexToDec = _require3.hexToDec;

var _require4 = require('./bagTag'),
    isBagTag = _require4.isBagTag,
    parseBagTag = _require4.parseBagTag;

var hasConditionalFields = function hasConditionalFields(barCode) {
  return barCode.length - 64 > 0;
};
var isValidBCBP = function isValidBCBP(barCode) {
  var value = barCode.substring(0, 1).trim();
  return value === 'M' && barCode.length > 58;
};

var getCodeMessage = function getCodeMessage(code, dataset) {
  try {
    var key = typeof code === 'string' ? code.toUpperCase() : code;
    return dataset[code] ? dataset[code] : code;
    // return {
    //   code,
    //   message: dataset[code],
    // };
  } catch (error) {
    return dataset['error'];
  }
};

module.exports = {
  parseBCBP: parseBCBP
};

function parseBCBP(barCode) {
  if (!barCode) return { error: 'Not a valid BCBP.' };
  if (isBagTag(barCode)) return parseBagTag(barCode);
  if (!isValidBCBP(barCode)) return { error: 'Not a valid BCBP.' };
  var hasConditionalData = barCode.length - 64 > 0;
  // the max standard iata input length,
  var maxStandardIata = 158;
  var result = {
    type: 'bcbp'
  };
  try {
    Object.keys(BCBPStandard).forEach(function (key) {
      var _BCBPStandard$key = BCBPStandard[key],
          length = _BCBPStandard$key.length,
          offset = _BCBPStandard$key.offset,
          content = _BCBPStandard$key.content;
      // TODO: add security params parser

      if (offset > maxStandardIata) return;
      var value = barCode.substring(offset - length, offset).trim();
      // console.log(`key: ${key} - value: ${value}`);

      switch (key) {
        case 'flight_date':
          result[key] = getJulianDate(value);
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
          result[key] = getJulianDate(value);
          return;
        case 'document_type':
          result[key] = getCodeMessage(value, documentTypes);
          return;
        case 'doc_verification':
          result[key] = getCodeMessage(value, documentVerificationTypes);
          return;
        case 'baggage_allowance':
          result[key] = value.length > 0 ? value : 0;
          return;
      }
      result[key] = value;
      return;
      // if (hasConditionalData) {}
    });
  } catch (error) {
    console.error(error);
    result.error = error.message;
  }
  return result;
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