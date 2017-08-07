import React, {Component} from 'react';
import './SearchResult.scss';
import arrowRight from '../../icons//arrow-right-gray.svg';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    
    var itineraries = this.props.resultData["Itineraries"];
    var agents = this.props.resultData["Agents"];
    var legs = this.props.resultData["Legs"];
    var carriers = this.props.resultData["Carriers"];
    var places = this.props.resultData["Places"];
    
    //TODO test currency. what if there are different currencies?
    var currency = this.props.resultData["Currencies"][0].Symbol;
  
    var recommendationList = itineraries.map(function(itinerary) {
    
      //airline
      var airlineId = legs[itinerary.OutboundLegId].OperatingCarriers[0];
      var airlineCode = carriers[airlineId].Code;
      var airlineLogo = `https://logos.skyscnr.com/images/airlines/favicon/${airlineCode}.png`;
      
      //legs TODO what if it is multi city?
      var legList = [legs[itinerary.OutboundLegId], legs[itinerary.InboundLegId]];
      var legDom = legList.map(function(leg) {
        
        var origin = places[leg.OriginStation].Code;
        var destination = places[leg.DestinationStation].Code;
        
        var arrival = new Date(leg.Arrival);
        var departure = new Date(leg.Departure);
        var arrivalTime = `${arrival.getHours()}:${arrival.getMinutes()}`;
        var departureTime = `${departure.getHours()}:${departure.getMinutes()}`;
        
        var durationHour = Math.floor(leg.Duration/60);
        var durationMinute = leg.Duration%60;
        durationMinute = (durationMinute>9)?`${durationMinute}`:`0${durationMinute}`;
        var duration = `${durationHour}h ${durationMinute}`;
        
        var direct = "direct";
        var isDirect = true;
        if(leg.Stops.length > 0) {
          isDirect = false;
          direct = `${leg.Stops.length} stop`;
          if(leg.Stops.length > 1)
            direct += "s";
        }
        
        return (
          <div className="leg">
            <div className="flight-info">
              <div className="airline-logo">
                <img alt="airline" width="24" height="24" src={airlineLogo}/>
              </div>
            
              <div className="flight-bound">
                <div className="flight-time">{departureTime}</div>
                <div className="place">{origin}</div>
              </div>
            
              <div class="arrow-right">
                <img alt="arrow-right" src={arrowRight}/>
              </div>
            
              <div className="flight-bound">
                <div className="flight-time">{arrivalTime}</div>
                <div className="place">{destination}</div>
              </div>
            </div>
          
            <div className="flight">
              <div className="duration">{duration}</div>
              <div className={(isDirect)?"direct":"stops"}>{direct}</div>
            </div>
          </div>
        );
      });
      
      //offer
      var agentId = itinerary.PricingOptions[0].Agents[0];
      var agent = agents[agentId];
      var price = itinerary.PricingOptions[0].Price;
      
      return (
        <div className="search-result">
          <div className="recommendation">
            <div className="itinerary">
              {legDom}
            </div>
          
            <div className="agency-info">
              <div className="offer">
                <span className="price">{currency}{price}</span>
                <span className="agent">{agent.Name}</span>
              </div>
              <button className="select-button">Select</button>
            </div>
        
          </div>
        </div>
      );
    });
  
    this.state = {
      recommendationList: recommendationList
    };
  }
  
  render() {
    return (
      <div className="search-results">
        {this.state.recommendationList}
      </div>
    );
  }
}

export default SearchResult;