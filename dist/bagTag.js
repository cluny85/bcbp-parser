'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var bagTagFormat = {
  // [length, offset]
  leadingDigit: [1, 1],
  airlineCode: [3, 4],
  bagNumber: [6, 10]
};

var isBagTag = function isBagTag(barCode) {
  var exp = '/[0-9]+/';
  var isNumberOnly = barCode.match(exp);
  return isNumberOnly && barCode.length === 10;
};

module.exports = {
  isBagTag: isBagTag,
  parseBagTag: parseBagTag
};

function parseBagTag(barCode) {
  var result = {
    type: 'BagTag'
  };
  Object.keys(bagTagFormat).forEach(function (key) {
    var _bagTagFormat$key = _slicedToArray(bagTagFormat[key], 2),
        length = _bagTagFormat$key[0],
        offset = _bagTagFormat$key[1];

    var value = barCode.substring(offset - length, offset).trim();
    result[key] = value;
  });
  return result;
}