const MS_DAY = 24 * 60 * 60 * 1000;

const getDayOfYear = (inputDate = new Date()) => {
  const firstDayOfYear = Date.UTC(inputDate.getFullYear(), 0, 0);
  const date = Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  return (date - firstDayOfYear) / MS_DAY;
};

const getYear = (julianYearLastDigit) => {
  const currentYear = new Date().getFullYear();
  if (julianYearLastDigit) {
    const year = parseInt(`${currentYear.toString().substring(0, 3)}${julianYearLastDigit}`, 10);
    const finalYear = currentYear > year ? year + 10 : year;
    return finalYear;
  }
  return currentYear;
};
const iataJulianDateRegexp = /^(?<julianYearLastDigit>\d)?(?<julianDayOfYear>\d{3})$/;

const getUTCDate = (input) => {
  if (!input || !input.length) return input;
  const { groups: { julianYearLastDigit, julianDayOfYear } } = input.match(iataJulianDateRegexp);
  const year = getYear(julianYearLastDigit);
  const date = new Date(Date.UTC(year, 0, 0));
  date.setTime(date.getTime() + (parseInt(julianDayOfYear, 10) * MS_DAY));
  if (getDayOfYear() > getDayOfYear(date)) {
    date.setFullYear(date.getFullYear() + 1);
  }
  return date;
};

module.exports = {
  getUTCDate
};
