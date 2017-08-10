import React, {Component} from 'react';
import './FlightSearch.scss';
import Autocomplete from 'react-autocomplete';

class FlightSearch extends Component {
  
  constructor(props) {
    super(props);
    this.formatNumber = this.formatNumber.bind(this);
  }
  
  formatNumber(e){
    var elem = document.getElementById(e.target.id);

    if(elem) {
      elem.value = parseInt(e.target.value, 10);
    }
    
    this.props.onChange(e);
  };
  
  render() {
    return (
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

        <div className="places">
          <div className="origin place">
            <label>From</label>
  
            <Autocomplete
              getItemValue={(item) => item.value}
              items={this.props.places}
              renderItem={(item, isHighlighted) =>
                <div className="auto-complete-item">{item.label}</div>
              }
              value={this.props.fromPlace}
              onChange={(e) => { this.props.changeValue("fromPlace", e.target.value) }}
              onSelect={(val) => { this.props.changeValue("fromPlace", val) }}
            />
          </div>
          
          <div className="destination place">
            <label>To</label>
            <Autocomplete
              getItemValue={(item) => item.value}
              items={this.props.places}
              renderItem={(item, isHighlighted) =>
                <div className="auto-complete-item">{item.label}</div>
              }
              value={this.props.toPlace}
              onChange={(e) => { this.props.changeValue("toPlace", e.target.value) }}
              onSelect={(val) => { this.props.changeValue("toPlace", val) }}
            />
          </div>
        </div>
        
        <div className="dates">
          <div className="date">
            <label>Depart</label>
            <input type="date" name="fromDate" value={this.props.fromDate}
                   onChange={this.props.onChange}/>
          </div>
          
          <div className="date">
            <label>Return</label>
            <input type="date" name="toDate" value={this.props.toDate}
                   onChange={this.props.returnDateChange}/>
          </div>
        </div>
        
        <div className="cabin-and-passengers">
          <div className="cabin-class">
            <label>Cabin Class & Travellers</label>
            <select name="class" value={this.props.class}
                    onChange={this.props.onChange}>
              <option>Economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
          </div>
          
          <div className="passengers">
            <div className="adults passenger">
              <label>Adults</label>
              <input type="number" name="adults" id="adults" max="8" value={this.props.adults} placeholder="Adults 16+"
                     onChange={this.formatNumber}/>
            </div>
            <div className="children passenger">
              <label>Children</label>
              <input type="number" name="children" id="children" max="8" value={this.props.children} placeholder="Children 1-16"
                     onChange={this.formatNumber}/>
            </div>
            <div className="infants passenger">
              <label>Infants</label>
              <input type="number" name="infants" id="infants" max="8" value={this.props.infants} placeholder="Infants 0-1"
                     onChange={this.formatNumber}/>
            </div>
          </div>
        </div>
        
        <div className="error-msg">{this.props.errorMsg}</div>
        <button onClick={this.props.searchFlight}>Search flights</button>
      </div>
    );
  }
}

export default FlightSearch;
