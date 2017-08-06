require('isomorphic-fetch');
require('es6-promise').polyfill();

// importing APIKey
const config = require('./config.js');

// importing and initialzing Express server
const express = require('express');
const app = express();
// importing api directory
const api = require('./api/');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Server started!');
});

/**
  Simple flight search api wrapper.

  TODO: client should provide params

  Api params and location values are here:
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/
app.get('/api/search', (req, res) => {
    var params = {
      "class": "Economy",
      "fromPlace": "EDI",
      "toPlace": "LHR",
      "fromDate": "2017-08-13",
      "toDate": "2017-08-14",
      "adults": "2",
      "children": "1",
      "infants": "1",
      "apiKey": "ss630745725358065467897349852985"
    };

  api.livePricing.search(params)
  .then((results) => {
    // TODO - a better format for displaying results to the client
    console.log('TODO: transform results for consumption by client');
    console.log(results);
    res.json(results);
  })
  .catch(console.error);
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
