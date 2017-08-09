import React, {Component} from 'react';
import './FlightSearch.scss';

class FlightSearch extends Component {
  
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
    
        <div className="places">
          <div className="origin place">
            <label>From</label>
            <input type="text" name="fromPlace" value={this.props.fromPlace}
                   onChange={this.props.onChange}/>
          </div>
      
          <div className="destination place">
            <label>To</label>
            <input type="text" name="toPlace" value={this.props.toPlace}
                   onChange={this.props.onChange}/>
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
                   onChange={this.props.onChange}/>
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
              <input type="number" name="adults" value={this.props.adults} placeholder="Adults 16+"
                     onChange={this.props.onChange}/>
            </div>
            <div className="children passenger">
              <label>Children</label>
              <input type="number" name="children" value={this.props.children} placeholder="Children 1-16"
                     onChange={this.props.onChange}/>
            </div>
            <div className="infants passenger">
              <label>Infants</label>
              <input type="number" name="infants" value={this.props.infants} placeholder="Infants 0-1"
                     onChange={this.props.onChange}/>
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
