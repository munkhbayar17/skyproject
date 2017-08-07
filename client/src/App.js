import React, { Component } from 'react';
import './App.scss';

import TopNav from './components/topnav';
// import TopControl from './components/topControl';
// import SearchResult from './components/searchResult';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      "class": "",
      "fromPlace": "",
      "toPlace": "",
      "fromDate": "",
      "toDate": "",
      "adults": "",
      "children": "",
      "infants": ""
    };
  }
  
  render() {
    return (
      <div className="App">
        <TopNav/>
        <div className="search-section">
    
          <div className="journey-type">
        
        <span>
          <label name="journey-type">
            <input name="journey-type" type="radio" value="1" checked/>
            <text>Return</text>
          </label>
        </span>
      
            <span>
          <label>
            <input name="journey-type" type="radio" value="2" disabled/>
            <text>One way</text>
          </label>
        </span>
      
            <span>
          <label>
            <input name="journey-type" type="radio" value="3" disabled/>
            <text>Multi-city</text>
          </label>
        </span>
    
          </div>
    
          <div className="origin place">
            <label>From</label>
            <input type="text" className="fromPlace" value={this.state.fromPlace}/>
          </div>
    
          <div className="destination place">
            <label>To</label>
            <input type="text" className="toPlace" value={this.state.toPlace}/>
          </div>
    
          <div className="dates">
            <div className="date">
              <label>Depart</label>
              <input type="date" className="fromDate" value={this.state.fromDate}/>
            </div>
      
            <div className="date">
              <label>Return</label>
              <input type="date" className="toDate" value={this.state.toDate}/>
            </div>
          </div>
    
          <div className="cabin-and-passengers">
            <text>Cabin Class & Travellers</text>
            <select className="class" value={this.state.class}>
              <option>Economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
      
            <div className="passengers">
              <input type="number" className="adults" value={this.state.adults} placeholder="Adults 16+"/>
              <input type="number" className="children" value={this.state.children} placeholder="Children 1-16"/>
              <input type="number" className="infants" value={this.state.infants} placeholder="Infants 0-1"/>
            </div>
          </div>
    
          <button onClick={this.handleClick}>Search flights</button>
        </div>
      </div>
    );
  }
  
  handleClick(e) {
    e.preventDefault();
    // TODO send parameters to server - check out `server/src/api/server.js`
    console.log('fetching results from server...');
    
    var params = {
      "class": this.state.class,
      "fromPlace": this.state.fromPlace,
      "toPlace": this.state.toPlace,
      "fromDate": this.state.fromDate,
      "toDate": this.state.toDate,
      "adults": this.state.adults,
      "children": this.state.children,
      "infants": this.state.infants
    };
    
    fetch('http://localhost:4000/api/search', { method: 'POST', body: params })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log('TODO: something with these results:');
        console.log(results);
      })
      .catch(console.error);
  }
  
  
}

export default App;
