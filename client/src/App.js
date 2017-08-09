import React, {Component} from 'react';
import './App.scss';

import TopNav from './components/topnav';
import FlightSearch from './components/flightsearch'
import TopControl from './components/topcontrol';
import SearchResult from './components/searchresult';
import WaitControl from './components/waitcontrol';
import Pager from './components/pager';

const querystring = require('querystring');

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      searching: false,
      pageLoading: false,
      class: "Economy",
      fromPlace: "EDI",
      toPlace: "LOND",
      fromDate: "2017-08-14",
      toDate: "2017-08-15",
      adults: "1",
      children: "0",
      infants: "0",
      pageNumber: 0,
      errorMsg: ""
    };
    
    this.onChange = this.onChange.bind(this);
    this.returnDateChange = this.returnDateChange.bind(this);
    this.searchFlight = this.searchFlight.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  };
  
  validate() {
    //passengers
    if(parseInt(this.state.adults, 10) > 8) {
      alert("Adults cannot be more than 8");
      return false;
    }
    if(parseInt(this.state.children, 10) > 8) {
      alert("Children cannot be more than 8");
      return false;
    }
    if(parseInt(this.state.infants, 10) > 8) {
      alert("Infants cannot be more than 8");
      return false;
    }
    if(parseInt(this.state.infants, 10) > parseInt(this.state.adults, 10)) {
      alert("Only 1 infant per adult is allowed");
      return false;
    }
    //dates
    if(new Date(this.state.toDate) < new Date(this.state.fromDate)) {
      alert("Return date cannot be later than departure date.");
      return false;
    }
    //places
    if(this.state.toPlace === this.state.fromPlace) {
      alert("Searching from and to the same city is not possible.");
      return false;
    }
    
    return true;
  }
  
  blurResult(action) {
    var resultDiv = document.getElementById("search-result");
    if(resultDiv) {
      
      if (action === 1) {
        resultDiv.classList.add("loading");
        this.setState({pageLoading: true});
      }
      else {
        resultDiv.classList.remove("loading");
        this.setState({pageLoading: false});
      }
    }
  }
  
  searchFlight() {
    
    if(!this.validate()) {
      return;
    }
  
    this.blurResult(1);
    
    this.setState({errorMsg: ""});
    this.setState({searching: true});

    var params = {
      class: this.state.class,
      fromPlace: this.state.fromPlace,
      toPlace: this.state.toPlace,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      adults: this.state.adults,
      children: this.state.children,
      infants: this.state.infants,
      pageNumber: this.state.pageNumber
    };
    
    var url = 'http://localhost:4000/api/search?';
    var query = querystring.stringify(params);
    
    fetch(url + query)
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        
        if(results) {
          console.log('fetched results');
          this.setState({results: results}, function stateUpdateCompleted() {
            this.blurResult(0);
          });
        }
        else {
          this.blurResult(0);
          this.setState({errorMsg: "No result found, please check the input."});
        }
  
        this.setState({searching: false});
      })
      .catch(function() {
        //server is down
        this.setState({searching: false});
        this.setState({errorMsg: "Something went wrong. Please try again."});
      }.bind(this));
  }
  
  onChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }
  
  returnDateChange(e) {
    e.preventDefault();
    this.setState({toDate: e.target.value}, function stateUpdateCompleted() {
      if(new Date(this.state.toDate) < new Date(this.state.fromDate)) {
        this.setState({fromDate: this.state.toDate});
      }
    }.bind(this));
  }
  
  next(e) {
    e.preventDefault();
    var currentPage = parseInt(this.state.pageNumber, 10);
    this.setState({pageNumber: (currentPage+1)}, function stateUpdateCompleted() {
      this.searchFlight();
    }.bind(this));
  }
  
  previous(e) {
    e.preventDefault();
    var currentPage = parseInt(this.state.pageNumber, 10);
    if(currentPage > 0) {
      this.setState({pageNumber: (currentPage - 1)}, function stateUpdateCompleted() {
        this.searchFlight();
      }.bind(this));
    }
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
          <SearchResult resultData={this.state.results} ref="searchResult"/>
          <Pager next={this.next}
                 previous={this.previous}
                 pageLoading={this.pageLoading}
                 pageNumber={this.state.pageNumber}>
          </Pager>
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
          errorMsg={this.state.errorMsg}
          onChange={this.onChange}
          returnDateChange={this.returnDateChange}
          searchFlight={this.searchFlight}/>
      </div>
    );
  };
}

export default App;
