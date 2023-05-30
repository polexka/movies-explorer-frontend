const moviesUrl = 'https://api.nomoreparties.co';
const mainUrl = 'https://api.diploma.nomoredomains.work';

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


module.exports = {
    moviesUrl,
    mainUrl,
    getNoun
};