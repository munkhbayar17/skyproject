import React from 'react';
import './SearchResult.scss';

var recommendations = [1,2,3];

var recommendationList = recommendations.map(function(item) {
  
  var itineraryList = ["edi-lon", "lon-edi"];
  
  var itineraries = itineraryList.map(function(itinerary) {
    return (
      <div className="itinerary">
        {itinerary}
      </div>
    );
  });
  
  return (
    <div className="search-result">
      <div className="recommendation">
        {item}
        <div className="itineraries">
          {itineraries}
        </div>
        <div className="agency-info">
          <div className="offer">
            <span className="price">101$</span>
            <span classname="agent">Z24</span>
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