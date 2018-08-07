  const expect = require('chai').expect;
  const utils = require('./utils');
  
  describe('getWordCount', () => {

    it('is a method that takes a string and an array and returns an object', () => { 
      expect(utils.getWordCount('Some text', ['some', 'text'])).to.eql({})
    });

    it('returns the correct word count of the string input excluding words from the array input', () => {
      expect(utils.getWordCount('Some text to test some text to test', ['text', 'to'])).to.eql({
        'some': 2,
        'test': 2
      })
    });

  })