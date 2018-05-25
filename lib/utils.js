const hexToDec = (hex) => (
  hex
  .toLowerCase()
  .split('')
  .reduce((result, char) => result * 16 + '0123456789abcdefgh'.indexOf(char), 0)
);

module.exports = {
  hexToDec,
};
