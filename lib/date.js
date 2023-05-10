const MS_DAY = 24 * 60 * 60 * 1000;

const daysIntoYear = (date) => {
  const firstDay = Date.UTC(date.getFullYear(), 0, 0);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return (today - firstDay) / MS_DAY;
};

const getYear = (currentDayOfYear, dayOfYear, yearLastDigit) => {
  if (yearLastDigit) {
    const currentYear = new Date().getFullYear();
    const year = parseInt(`${currentYear.toString().substring(0, 3)}${yearLastDigit}`, 10);
    const finalYear = currentYear > year ? year + 10 : year;
    return finalYear;
  }
  return currentDayOfYear > dayOfYear
    ? new Date().getFullYear() + 1
    : new Date().getFullYear();
};

const getNormalDate = (input) => {
  const currentDayOfYear = daysIntoYear(new Date());
  const dayOfYear = parseInt(input.slice(-3), 10);
  const yearLastDigit = input.split('').reverse()[3];
  const year = getYear(currentDayOfYear, dayOfYear, yearLastDigit);
  const date = new Date(year, 0, 0);
  date.setDate(date.getDate() + parseInt(dayOfYear, 10));
  return date;
};

module.exports = {
  getNormalDate
};
