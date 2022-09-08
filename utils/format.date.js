const formatDate = (date) => {
  const newDate = new Date(date);
  let formattedDate = `${newDate.getFullYear()}-`;
  formattedDate += `${`0${newDate.getMonth() + 1}`.slice(-2)}-`; // for double digit month
  formattedDate += `${`0${newDate.getDate()}`.slice(-2)}`; // for double digit day
  return formattedDate;
};

module.exports = formatDate;