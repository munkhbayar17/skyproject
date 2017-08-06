import React, { Component } from 'react';
import './App.scss';

import TopNav from './components/topnav';
// import TopControl from './components/topControl';
// import SearchResult from './components/searchResult';

function SearchAction() {
  function handleClick(e) {
    e.preventDefault();
    // TODO send parameters to server - check out `server/src/api/server.js`
    console.log('fetching results from server...');
  
    fetch('http://localhost:4000/api/search')
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log('TODO: something with these results:');
        console.log(results);
      })
      .catch(console.error);
  }
  
  return (
    <div className="search-section">
      
      <div className="journey-type">
        
        <span>
          <label name="journey-type">
            <input name="journey-type" type="radio" value="1"/>
            <text>Return</text>
          </label>
        </span>
        
        <span>
          <label>
            <input name="journey-type" type="radio" value="2"/>
            <text>One way</text>
          </label>
        </span>
        
        <span>
          <label>
            <input name="journey-type" type="radio" value="3"/>
            <text>Multi-city</text>
          </label>
        </span>
        
      </div>
      
      <div className="origin place">
        <label>From</label>
        <input type="text" className="fromPlace"/>
      </div>
  
      <div className="destination place">
        <label>To</label>
        <input type="text" className="toPlace"/>
      </div>
  
      <div className="dates">
        <div className="date">
          <label>Depart</label>
          <input type="date" className="fromDate"/>
        </div>
  
        <div className="date">
          <label>Return</label>
          <input type="date" className="toDate"/>
        </div>
      </div>
      
      <div className="cabin-and-passengers">
        <text>Cabin Class & Travellers</text>
        <select className="class">
          <option>Economy</option>
          <option>Business</option>
          <option>First</option>
        </select>
      
        <div className="passengers">
          <input type="number" className="adults" placeholder="Adults 16+"/>
          <input type="number" className="children" placeholder="Children 1-16"/>
          <input type="number" className="infants" placeholder="Infants 0-1"/>
        </div>
      </div>
      
      <button onClick={handleClick}>Search flights</button>
    </div>
  );
};

class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <TopNav/>
        <SearchAction/>
        {/*<TopNav/>*/}
        {/*<TopControl/>*/}
        {/*<SearchResult/>*/}
      </div>
    );
  }
}

export default App;
