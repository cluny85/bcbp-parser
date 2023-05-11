const MS_DAY = 24 * 60 * 60 * 1000;

const getCurrentDayOfYear = () => {
  const today = new Date();
  const firstDayOfYear = Date.UTC(today.getFullYear(), 0, 0);
  const date = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return (date - firstDayOfYear) / MS_DAY;
};

const getYear = (julianDayOfYear, julianYearLastDigit) => {
  const currentYear = new Date().getFullYear();
  if (julianYearLastDigit) {
    const year = parseInt(`${currentYear.toString().substring(0, 3)}${julianYearLastDigit}`, 10);
    const finalYear = currentYear > year ? year + 10 : year;
    return finalYear;
  }
  return getCurrentDayOfYear() > julianDayOfYear
    ? currentYear + 1
    : currentYear;
};

const iataJulianDateRegexp = /^(?<julianYearLastDigit>\d)?(?<julianDayOfYear>\d{3})$/;

const getUTCDate = (input) => {
  const { groups: { julianYearLastDigit, julianDayOfYear } } = input.match(iataJulianDateRegexp);
  const year = getYear(julianDayOfYear, julianYearLastDigit);
  const date = new Date(Date.UTC(year, 0, 0));
  date.setTime(date.getTime() + (parseInt(julianDayOfYear, 10) * MS_DAY));
  return date;
};

module.exports = {
  getUTCDate
};
