/* eslint no-use-before-define:0 */
const _ = require('lodash');
const config = require('../config');
const querystring = require('querystring');
// const HttpProxyAgent = require('http-proxy-agent');

const pricingUrl = config.skyscannerApi + 'apiservices/pricing/v1.0';

const maxRetries = 3;
const maxPollTime = 15 * 1000;
const pollDelay = 1000;

var pageNumber = 0;

let cachedData = {};

/**
 Rough implementation of live pricing api client, as per
 http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingList
 */
const livePricing = {
  api: {
    createSession: (params) => {
      return fetch(pricingUrl + `?apikey=${config.apiKey}`, {
        method: 'POST',
        body: sessionParams(params),
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // uncomment if you'd like to use a development proxy (e.g. Charles or Fiddler)
        // agent: new HttpProxyAgent({
        //   host: 'localhost',
        //   port: '8888'
        // })
      })
    },
    pollSession: (creds, pageNumber) => {
      // TODO paging needed here
      return fetch(pricingUrl + `/${creds.sessionKey}?apiKey=${config.apiKey}&sortType=price*&sortOrder=asc&pageIndex=${pageNumber}`, {
        method: 'GET',
        // uncomment if you'd like to use a development proxy (e.g. Charles or Fiddler)
        // agent: new HttpProxyAgent({
        //   host: 'localhost',
        //   port: '8888'
        // })
      })
    }
  }
};

function createSession(params) {
  console.log('creating session...');
  
  return new Promise((resolve, reject) => {
    livePricing.api.createSession(params)
      .then((response) => {
        if (response.status !== 201) {
          console.error(response.status, 'something went wrong...')
          return console.error.json()
          //.then(console.error);
        } else {
          // session created
          _.delay(() => {
            resolve({
              location: response.headers.get('location'),
              response: response.json()
            });
          }, pollDelay);
        }
        
      })
      .catch(reject);
  });
}

function startPolling(session) {
  const location = session.location;
  const sessionKey = location.substring(location.lastIndexOf('/') + 1);
  
  console.log('session created.');
  
  return new Promise((resolve, reject) => {
    // encapsulation of polling state to pass around
    const pollState = {
      creds: {sessionKey: sessionKey},
      finished: false,
      onFinished: resolve,
      onError: reject,
      timedOut: false,
      tries: 0
    };
    
    pollState.success = _.partial(pollSuccess, pollState);
    pollState.error = _.partial(pollError, pollState);
    
    pollState.repoll = () => {
      _.delay(() => {
        poll(pollState, pageNumber);
      }, pollDelay);
    };
    
    // overall timeout - don't wait too long for complete results
    setTimeout(() => {
      pollState.timedOut = true;
    }, maxPollTime);
    
    poll(pollState, pageNumber);
  });
}

function poll(state, pageNumber) {
  if (state.finished) {
    return;
  }
  
  // auto-repoll if nothing happens for a while
  const backupTimer = setTimeout(() => {
    state.repoll();
  }, pollDelay * 3);
  
  console.log('polling...')
  
  livePricing.api.pollSession(state.creds, pageNumber)
    .then((response) => {
      clearTimeout(backupTimer);
      
      if (response.status === 304) {
        return cachedData;
      }
      return response.json();
    })
    .then((data) => {
      cachedData = data;
      state.success(data);
    })
    .catch(state.err);
}

function pollSuccess(state, data) {
  if (state.finished) {
    return;
  }
  if (data.Status === 'UpdatesComplete' || state.timedOut) {
    console.log('polling complete');
    state.finished = true;
    return state.onFinished(data);
  }
  state.repoll();
}

// Not implemented: error handling by response code
function pollError(state, err) {
  state.tries++;
  if (!state.timedOut && state.tries < maxRetries) {
    return state.repoll();
  }
  state.onError(err);
}

const sessionParams = (query) => {
  return querystring.stringify({
    apiKey: config.apiKey,
    adults: query.adults,
    children: query.children,
    infants: query.infants,
    cabinclass: query.class,
    country: 'UK',
    currency: 'GBP',
    destinationplace: query.toPlace,
    inbounddate: query.toDate,
    locale: 'en-GB',
    locationschema: 'Sky',
    originplace: query.fromPlace,
    outbounddate: query.fromDate
  });
}

livePricing.search = (searchParams) => {
  pageNumber = searchParams.pageNumber;
  return new Promise((resolve, reject) => {
    createSession(searchParams)
      .then(startPolling)
      .then(resolve)
      .catch(reject);
  });
};

module.exports = livePricing;
