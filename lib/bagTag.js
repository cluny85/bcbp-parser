const bagTagFormat = {
  // [length, offset]
  leadingDigit: [1, 1],
  airlineCode : [3, 4],
  bagNumber   : [6, 10],
};

const isBagTag = (barCode) => {
  const exp = '/[0-9]+/';
  const isNumberOnly = barCode.match(exp);
  return (isNumberOnly && barCode.length === 10)
}

module.exports = {
  isBagTag,
  parseBagTag,
};

function parseBagTag(barCode) {
  const result = {
    type: 'BagTag',
  };
  Object.keys(bagTagFormat).forEach((key) => {
    const [length, offset] = bagTagFormat[key];
    const value = barCode.substring(offset - length, offset).trim();
    result[key] = value;
  });
  return result;
}
