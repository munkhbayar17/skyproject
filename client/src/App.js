import React, {Component} from 'react';
import './App.scss';

import TopNav from './components/topnav';
import FlightSearch from './components/flightsearch'
// import TopControl from './components/topControl';
// import SearchResult from './components/searchResult';

class App extends Component {
  
  
  constructor(props) {
    super(props);
    
    this.state = {
      class: "Economy",
      fromPlace: "EDI",
      toPlace: "LOND",
      fromDate: "2017-08-14",
      toDate: "2017-08-15",
      adults: "1",
      children: "0",
      infants: "0"
    };
    
    this.onChange = this.onChange.bind(this);
    this.searchFlight = this.searchFlight.bind(this);
  };
  
  searchFlight() {
    
    var params = {
      class: this.state.class,
      fromPlace: this.state.fromPlace,
      toPlace: this.state.toPlace,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      adults: this.state.adults,
      children: this.state.children,
      infants: this.state.infants
    };
    
    const querystring = require('querystring');
    var url = 'http://localhost:4000/api/search?';
    var query = querystring.stringify(params);
    
    fetch(url + query)
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log('TODO: something with these results:');
        console.log(results);
        
        // TODO call searchResult
      })
      .catch(console.error);
  }
  
  onChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }
  
  render() {
    return (
      <div className="App">
        <TopNav/>
        <FlightSearch
          fromPlace={this.state.fromPlace}
          toPlace={this.state.toPlace}
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          class={this.state.class}
          adults={this.state.adults}
          children={this.state.children}
          infants={this.state.infants}
          onChange={this.onChange}
          searchFlight={this.searchFlight}/>
      </div>
    );
  };
}

export default App;
