"use strict";

var julian = {
  dayInMs: 1000 * 60 * 60 * 24,
  julian1970: 2440588,
  julian2000: 2451545
};

var getJulianDate = function getJulianDate(jd) {
  var dayInMs = julian.dayInMs,
      julian1970 = julian.julian1970;

  return jd ? new Date((jd + 0.5 - julian1970) * dayInMs) : new Date().valueOf() / dayInMs - 0.5 + julian1970;
};

var julianDays = function julianDays(jdays) {
  return jdays ? getJulianDate(jdays + julian2000) : getJulianDate() - julian2000;
};

module.exports = {
  getJulianDate: getJulianDate,
  julianDays: julianDays
};