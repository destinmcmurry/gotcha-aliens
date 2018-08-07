const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;
const { generateTest, didClientPass } = require('./utils');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  res.send(err.status || 500);
});

app.get('/', (req, res, next) => {
  const clientTest = generateTest();
  res.send(clientTest);
});

app.post('/', (req, res, next) => {
  const clientResponse = req.body;
  const isSuccessful = didClientPass(clientResponse);
  if (isSuccessful) {
    res.status(200).send('Amazing! You did so well, please continue!');
  } else if (isSuccessful === null) {
    res.send('Sorry, something went wrong :/ Please request a new test');
  } else {
    res.status(400).send('GOTCHA, TROLL');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening for ya on port ${PORT}!`)
});

module.exports = app;