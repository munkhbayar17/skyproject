import React, {Component} from 'react';
import './TopControl.scss';

import arrowRight from '../../icons//arrow-right.svg';
import priceAlert from '../../icons//price-alerts.svg';

class TopControl extends Component {
  
  render() {
    return (
      <div className="top-control">
        
        <div className="journey-info">
          <div className="route">
            <div className="origin">
              {this.props.fromPlace}
            </div>
            <a href="#">
              <img className="arrow-right" alt="arrow-right" src={arrowRight}/>
            </a>
            <div className="destination">
              {this.props.toPlace}
            </div>
          </div>
          
          <div className="travellers">
            <span className="travellers-count">{"" + this.props.passengers + " traveller" + ((parseInt(this.props.passengers, 10)>1)?"s":"")},</span>
            <span className="cabin-class">&nbsp;{this.props.class.toLowerCase()}</span>
          </div>
        </div>
        
        <div className="controls">
          <div className="result-controls">
            <span>Filter</span>
            <span className="sort">Sort</span>
          </div>
          <span>
            <img alt="Price-Alert" src={priceAlert}/>
            Price alerts
          </span>
        </div>
      
      </div>
    );
  }
}


export default TopControl;