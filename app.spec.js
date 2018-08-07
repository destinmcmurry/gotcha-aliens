const expect = require('chai').expect;
const request = require('supertest');
const app = require('./app');
const agent = request.agent(app);
const utils = require('./utils');

describe('Alien CAPTCHA Server:', () => {

  describe('GET /', () => {
    
    it('responds with a random body of text and a list of words to ignore', () => {
      return agent
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.an.instanceof(Object);
        expect(res.body.textBody).to.be.a('string');
        expect(res.body.blacklist).to.be.an.instanceof(Array);
      });
    });

  });

  describe('POST /', () => {

    beforeEach(() => {
      utils.currentTest = {
        'textBody': 'To understand recursion you must first understand recursion',
        'blacklist': [ 'recursion', 'first' ]
      }
    })
    
    it('responds with a 200 status if the client passes the test', () => {
      return agent
        .post('/')
        .send({
          'textBody': 'To understand recursion you must first understand recursion',
          'blacklist': [ 'recursion', 'first' ],
          'clientAnswer': {
              'to': 1,
              'understand': 2,
              'you': 1,
              'must': 1
          }
        })
        .expect(200)
    });

    it('responds with a 400 status if the client sends an incorrect word count', () => {
      return agent
        .post('/')
        .send({ 
          'textBody': 'To understand recursion you must first understand recursion',
          'blacklist': [ 'recursion', 'first' ],
          'clientAnswer': {
              'to': 1,
              'understand': 2,
              'recursion': 2,
              'must': 1
          }
        })
        .expect(400)
    });

    it('responds with a 400 status if the client response fails the test verification', () => {
      return agent
        .post('/')
        .send({ 
          'textBody': 'Here are some words to count so please count the words please thank you',
          'blacklist': [ 'count', 'so', 'some', 'you' ],
          'clientAnswer': {
            'here': 1,
            'are': 1,
            'words': 2,
            'to': 1,
            'please': 2,
            'the': 1,
            'thank': 1
          }
        })
        .expect(400)
    });

    it('responds with a custom error message if there is no test in memory', () => {
      utils.currentTest = null;
      return agent
        .post('/')
        .send({
          'textBody': 'To understand recursion you must first understand recursion',
          'blacklist': [ 'recursion', 'first' ],
          'clientAnswer': {
              'to': 1,
              'understand': 2,
              'you': 1,
              'must': 1
          }
        })
        .expect('Sorry, something went wrong :/ Please request a new test')
    });

  });

});