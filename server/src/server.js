require('isomorphic-fetch');
require('es6-promise').polyfill();

// importing APIKey
const config = require('./config.js');

// importing and initialzing Express server
const express = require('express');
const app = express();
// importing api directory
const api = require('./api/');

function toHashTable(arr) {
  var table = {};
  arr.forEach(function(elem) {
    table[elem.Id] = elem;
  });
  return table;
}

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
  
  var params = req.query;

  api.livePricing.search(params)
  .then((results) => {
    
    //converting arrays to hashtable
    results.Agents = toHashTable(results.Agents);
    results.Carriers = toHashTable(results.Carriers);
    results.Legs = toHashTable(results.Legs);
    results.Places = toHashTable(results.Places);
    // TODO if segment is to be shown on the front-end, convert it.
    
    res.json(results);
  })
  .catch(console.error);
});

//TODO page request need to be added
//app.get('/api/search/2', (req, res) => {

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
