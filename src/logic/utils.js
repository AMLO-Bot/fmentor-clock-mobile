const getRandomItem =  (arr) => {
  if(arr.length < 3) return undefined
  return arr[Math.floor(Math.random()*arr.length)];
}

const getWeek = (date)  => {
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

const getDayNumber = (date) => {
  var now = date;
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day
  console.log('Day of year: ' + day);
}

const splitInSentences = str => str.split(/(?<=\.)/).join('<br>');


export {getDayNumber, getWeek, getRandomItem, splitInSentences}