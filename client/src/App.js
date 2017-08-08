import React, {Component} from 'react';
import './App.scss';

import TopNav from './components/topnav';
import FlightSearch from './components/flightsearch'
import TopControl from './components/topcontrol';
import SearchResult from './components/searchresult';
import WaitControl from './components/waitcontrol';

const querystring = require('querystring');

class App extends Component {
  
  
  constructor(props) {
    super(props);
    
    this.state = {
      searching: false,
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
    this.setState({searching: true});
    
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
    
    var url = 'http://localhost:4000/api/search?';
    var query = querystring.stringify(params);
    
    fetch(url + query)
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        
        if(results) {
          console.log('TODO: something with these results:');
          console.log(results);
          this.setState({results: results});
        }
        else {
          console.log("no result");
          //TODO no result
        }
  
        this.setState({searching: false});
      })
      .catch(console.error);
  }
  
  onChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }
  
  passengersCount() {
    return parseInt(this.state.adults, 10)+parseInt(this.state.children, 10)+parseInt(this.state.infants, 10);
  }
  
  render() {
    //result page
    if(this.state.results) {
      return (
        <div className="App">
          <TopNav/>
          <TopControl fromPlace={this.state.fromPlace}
                      toPlace={this.state.toPlace}
                      passengers={this.passengersCount()}
                      class={this.state.class}/>
          <SearchResult resultData={this.state.results}/>
        </div>
      );
    }
    else if(this.state.searching) {
      //searching
      return (
        <div className="App">
          <TopNav/>
          <TopControl fromPlace={this.state.fromPlace}
                      toPlace={this.state.toPlace}
                      passengers={this.passengersCount()}
                      class={this.state.class}/>
          <WaitControl/>
        </div>
      );
    }
    
    //homepage
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
