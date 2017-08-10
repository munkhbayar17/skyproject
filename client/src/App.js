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
    this.pollFlight = this.pollFlight.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  };
  
  /*
  * Validates search form
  * */
  validate() {
    //passengers
    if (parseInt(this.state.adults, 10) > 8) {
      alert("Adults cannot be more than 8");
      return false;
    }
    if (parseInt(this.state.children, 10) > 8) {
      alert("Children cannot be more than 8");
      return false;
    }
    if (parseInt(this.state.infants, 10) > 8) {
      alert("Infants cannot be more than 8");
      return false;
    }
    if (parseInt(this.state.infants, 10) > parseInt(this.state.adults, 10)) {
      alert("Only 1 infant per adult is allowed");
      return false;
    }
    //dates
    if (new Date(this.state.toDate) < new Date(this.state.fromDate)) {
      alert("Return date cannot be later than departure date.");
      return false;
    }
    //places
    if (this.state.toPlace === this.state.fromPlace) {
      alert("Searching from and to the same city is not possible.");
      return false;
    }
    
    return true;
  }
  
  /*
  * blurs screen while loading next page
  * */
  blurResult(action) {
    var resultDiv = document.getElementById("app");
    if (resultDiv) {
      
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
  
  /*
  * call live-price api of skyscanner using form data
  * */
  searchFlight() {
    
    if (!this.validate()) {
      return;
    }
    
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
        
        if (results) {
          this.setState({sessionKey: results.SessionKey});
          this.setState({results: results});
        }
        else {
          this.setState({errorMsg: "No result found, please check the input."});
        }
        
        this.setState({searching: false});
      })
      .catch(function () {
        //server is down
        console.log("server is down!");
        this.setState({searching: false});
        this.setState({errorMsg: "Something went wrong, please try again."});
      }.bind(this));
  }
  
  /*
  * get next page of flights using the sessionKey received on the search response
  * */
  pollFlight() {
    //blur screen
    this.blurResult(1);
    
    this.setState({errorMsg: ""});
    
    var params = {
      sessionKey: this.state.sessionKey,
      pageNumber: this.state.pageNumber
    };
    
    var url = 'http://localhost:4000/api/search/page?';
    var query = querystring.stringify(params);
    
    fetch(url + query)
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        
        if (results) {
          this.setState({results: results}, function stateUpdateCompleted() {
            //removes blur when state updates
            this.blurResult(0);
          });
        }
        else {
          //removes blur
          this.blurResult(0);
          this.setState({errorMsg: "No result found, please check the input."});
        }
        
      })
      .catch(function () {
        //server is down
        console.log("server is down!");
        this.setState({results: null});
        this.setState({errorMsg: "Something went wrong. Please try again."});
        this.blurResult(0);
      }.bind(this));
  }
  
  /*
  * update form data
  * */
  onChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }
  
  /*
  * updates dates
  * */
  returnDateChange(e) {
    e.preventDefault();
    this.setState({toDate: e.target.value}, function stateUpdateCompleted() {
      if (new Date(this.state.toDate) < new Date(this.state.fromDate)) {
        this.setState({fromDate: this.state.toDate});
      }
    }.bind(this));
  }
  
  /*
  * next page
  * */
  next(e) {
    e.preventDefault();
    var currentPage = parseInt(this.state.pageNumber, 10);
    this.setState({pageNumber: (currentPage + 1)}, function stateUpdateCompleted() {
      this.pollFlight();
    }.bind(this));
  }
  
  /*
  * previous page
  * */
  previous(e) {
    e.preventDefault();
    var currentPage = parseInt(this.state.pageNumber, 10);
    if (currentPage > 0) {
      this.setState({pageNumber: (currentPage - 1)}, function stateUpdateCompleted() {
        this.pollFlight();
      }.bind(this));
    }
  }
  
  passengersCount() {
    return parseInt(this.state.adults, 10) + parseInt(this.state.children, 10) + parseInt(this.state.infants, 10);
  }
  
  render() {
    
    var topNav = <TopNav/>;
    var search;
    var topControl;
    var waitControl;
    var searchResult;
    var pager;
  
    if (this.state.results && this.state.results !== {}) {
      topControl = <TopControl fromPlace={this.state.fromPlace} toPlace={this.state.toPlace}
                               passengers={this.passengersCount()} class={this.state.class}/>;
      searchResult = <SearchResult resultData={this.state.results} ref="searchResult"/>;
      pager = <Pager next={this.next} previous={this.previous} pageLoading={this.pageLoading}
                     pageNumber={this.state.pageNumber}/>;
    }
    else if (this.state.searching) {
      waitControl = <WaitControl/>;
      topControl = <TopControl fromPlace={this.state.fromPlace} toPlace={this.state.toPlace}
                               passengers={this.passengersCount()} class={this.state.class}/>;
    }
    else {
      search = <FlightSearch
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
        searchFlight={this.searchFlight}/>;
    }
  
    return (
      <div id="app" className="App">
        {topNav}
        {topControl}
        {search}
        {waitControl}
        {searchResult}
        {pager}
      </div>
    );
  };
}

export default App;
