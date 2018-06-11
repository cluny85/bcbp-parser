'use strict';

var hexToDec = function hexToDec(hex) {
  return hex.toLowerCase().split('').reduce(function (result, char) {
    return result * 16 + '0123456789abcdefgh'.indexOf(char);
  }, 0);
};

module.exports = {
  hexToDec: hexToDec
};