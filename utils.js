const fs = require('fs');

const utils = {
  currentTest: null
};

utils.generateTest = () => {
  const randomNum = Math.floor(Math.random()*6);
  const textBody = fs.readFileSync(`./texts/${randomNum}`, 'utf8');
  const testObj = {
    textBody,
    blacklist: utils.generateBlacklist(textBody)
  }
  utils.currentTest = testObj;
  return testObj;
}

utils.generateBlacklist = text => {
  text = text.split(' ');
  const blacklistLength = text.length/4;
  const blacklist = {};
  let count = 0;
  while (count < blacklistLength) {
    const randomNum = Math.floor(Math.random()*text.length);
    if (!blacklist[text[randomNum]]) {
      blacklist[text[randomNum].toLowerCase()] = true;
      count++;
    }
  }
  return Object.keys(blacklist);
}

utils.didClientPass = responseObj => {
  const { textBody, blacklist, clientAnswer } = responseObj;
  const correctCount = utils.getWordCount(textBody, blacklist);
  if (!utils.currentTest) return null;
  if (!utils.verifyTest(textBody, blacklist)) return false;
  for (let key in correctCount) {
    if (!clientAnswer[key] || !(clientAnswer[key] === correctCount[key])) {
      return false;
    }
  }
  for (let key in clientAnswer) {
    if (!correctCount[key]) {
      return false;
    }
  }
  return true;
}

utils.getWordCount = (text, blacklist) => {
  text = text.split(' ');
  const correctCount = text.reduce((allWords, word) => {
    word = word.toLowerCase();
    if (!blacklist.includes(word)) {
      if (word in allWords) {
        allWords[word]++;
      } else {
        allWords[word] = 1;
      }
    }
    return allWords;
  }, {});
  return correctCount;
}

utils.verifyTest = (text, blacklist) => {
  if (utils.currentTest && utils.currentTest.textBody === text && utils.currentTest.blacklist.join() === blacklist.join()) return true;
  return false;
}

module.exports = utils;