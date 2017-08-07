import React from 'react';
import './TopControl.scss';

import arrowRight from '../../icons//arrow-right.svg';
import priceAlert from '../../icons//price-alerts.svg';

var originPlace = "EDI";
var destinationPlace = "LON";
var travellerCount = 2;
var cabinClass = "economy";

const TopControl = () => (
  <div className="top-control">
    <div className="journey-info">
      <div className="route">
        <div className="origin">
          {originPlace}
        </div>
        <a href="#">
          <img className="arrow-right" alt="arrow-right" src={arrowRight}/>
        </a>
        <div className="destination">
          {destinationPlace}
        </div>
      </div>
    
      <div className="travellers">
        <span className="travellers-count">{travellerCount} travellers,</span>
        <span className="cabin-class">&nbsp;{cabinClass}</span>
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

export default TopControl;