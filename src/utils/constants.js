const moviesUrl = 'https://api.nomoreparties.co';
const mainUrl = 'https://api.diploma.nomoredomains.work';
// const mainUrl = 'http://localhost:5000';

function getNoun(number, word) {
  let n = number % 100;
  if (n >= 5 && n <= 20) {
    return word[2];
  }
  n %= 10;
  if (n === 1) {
    return word[0];
  }
  if (n >= 2 && n <= 4) {
    return word[1];
  }
  return word[2]
}

const mobileStartCount = 5;
const tabletStartCount = 8;
const startCount = 12;

const mobileMoreCardsCount = 2;
const moreCardsCount = 3;
const shortsDuration = 40;

const messageTime = 2000;

module.exports = {
    moviesUrl,
    mainUrl,
    getNoun,
    mobileMoreCardsCount,
    moreCardsCount,
    shortsDuration,
    mobileStartCount,
    tabletStartCount,
    startCount, 
    messageTime
};