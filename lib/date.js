const MS_DAY = 24 * 60 * 60 * 1000;

const getCurrentDayOfYear = () => {
  const today = new Date();
  const firstDayOfYear = Date.UTC(today.getFullYear(), 0, 0);
  const date = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return (date - firstDayOfYear) / MS_DAY;
};

const getYear = (dayOfYear, yearLastDigit) => {
  const today = new Date();
  if (yearLastDigit) {
    const currentYear = today.getFullYear();
    const year = parseInt(`${currentYear.toString().substring(0, 3)}${yearLastDigit}`, 10);
    const finalYear = currentYear > year ? year + 10 : year;
    return finalYear;
  }
  return getCurrentDayOfYear() > dayOfYear
    ? today.getFullYear() + 1
    : today.getFullYear();
};

const getNormalDate = (input) => {
  const dayOfYear = parseInt(input.slice(-3), 10);
  const yearLastDigit = input.split('').reverse()[3];
  const year = getYear(dayOfYear, yearLastDigit);
  const date = new Date(year, 0, 0);
  date.setDate(date.getDate() + parseInt(dayOfYear, 10));
  return date;
};

module.exports = {
  getNormalDate
};
