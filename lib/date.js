const MS_DAY = 24 * 60 * 60 * 1000;

const getCurrentDayOfYear = () => {
  const today = new Date();
  const firstDayOfYear = Date.UTC(today.getFullYear(), 0, 0);
  const date = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return (date - firstDayOfYear) / MS_DAY;
};

const getYear = (julianDayOfYear, julianYearLastDigit) => {
  const today = new Date();
  if (julianYearLastDigit) {
    const currentYear = today.getFullYear();
    const year = parseInt(`${currentYear.toString().substring(0, 3)}${julianYearLastDigit}`, 10);
    const finalYear = currentYear > year ? year + 10 : year;
    return finalYear;
  }
  return getCurrentDayOfYear() > julianDayOfYear
    ? today.getFullYear() + 1
    : today.getFullYear();
};

const getNormalDate = (input) => {
  const julianDayOfYear = parseInt(input.slice(-3), 10);
  const julianYearLastDigit = input.split('').reverse()[3];
  const year = getYear(julianDayOfYear, julianYearLastDigit);
  const date = new Date(Date.UTC(year, 0, 0));
  date.setTime(date.getTime() + (julianDayOfYear * MS_DAY));
  return date;
};

module.exports = {
  getNormalDate
};
