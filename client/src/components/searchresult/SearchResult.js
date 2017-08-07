import React from 'react';
import './SearchResult.scss';

import arrowRight from '../../icons//arrow-right-gray.svg';

var recommendations = [1,2,3];

var recommendationList = recommendations.map(function(item) {
  
  var legList = ["edi-lon", "lon-edi"];
  
  var legs = legList.map(function(itinerary) {
    return (
      <div className="leg">
        {/*{itinerary}*/}
        
        <div className="flight-info">
  
          <div className="airline-logo">
            <img alt="airline" width="24" height="24" src="https://logos.skyscnr.com/images/airlines/favicon/EZ.png"/>
          </div>
          
          <div className="flight-bound">
            <div className="flight-time">07:00</div>
            <div className="place">EDI</div>
          </div>
          
          <div class="arrow-right">
            <img alt="arrow-right" src={arrowRight}/>
          </div>
          
          <div className="flight-bound">
            <div className="flight-time">07:00</div>
            <div className="place">LON</div>
          </div>
          
        </div>
  
        <div className="flight">
          <div className="duration">1h 30</div>
          <div className="direct">Direct</div>
        </div>
        
      </div>
    );
  });
  
  return (
    <div className="search-result">
      <div className="recommendation">
        {/*{item}*/}
        <div className="itinerary">
          {legs}
        </div>
  
        <div className="agency-info">
          <div className="offer">
            <span className="price">$101</span>
            <span className="agent">omega</span>
          </div>
          <button className="select-button">Select</button>
        </div>
        
      </div>
    </div>
  );
});

const SearchResult = () => (
  <div className="search-results">
    {recommendationList}
  </div>
);

export default SearchResult;