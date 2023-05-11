"use strict";

var MS_DAY = 24 * 60 * 60 * 1000;

var getDayOfYear = function getDayOfYear() {
  var inputDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

  var firstDayOfYear = Date.UTC(inputDate.getFullYear(), 0, 0);
  var date = Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  return (date - firstDayOfYear) / MS_DAY;
};

var getYear = function getYear(julianYearLastDigit) {
  var currentYear = new Date().getFullYear();
  if (julianYearLastDigit) {
    var year = parseInt("" + currentYear.toString().substring(0, 3) + julianYearLastDigit, 10);
    var finalYear = currentYear > year ? year + 10 : year;
    return finalYear;
  }
  return currentYear;
};

var iataJulianDateRegexp = /^(?<julianYearLastDigit>\d)?(?<julianDayOfYear>\d{3})$/;

var getUTCDate = function getUTCDate(input) {
  var _input$match = input.match(iataJulianDateRegexp),
      _input$match$groups = _input$match.groups,
      julianYearLastDigit = _input$match$groups.julianYearLastDigit,
      julianDayOfYear = _input$match$groups.julianDayOfYear;

  var year = getYear(julianYearLastDigit);
  var date = new Date(Date.UTC(year, 0, 0));
  date.setTime(date.getTime() + parseInt(julianDayOfYear, 10) * MS_DAY);
  if (getDayOfYear() > getDayOfYear(date)) {
    date.setFullYear(date.getFullYear() + 1);
  }
  return date;
};

module.exports = {
  getUTCDate: getUTCDate
};