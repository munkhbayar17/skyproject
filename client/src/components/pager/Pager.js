import React, {Component} from 'react';
import './Pager.scss';

class Pager extends Component {
  
  render() {
    var prevButton = "";
    if (this.props.pageNumber > 0) {
      prevButton = <button type="button" className="previous" onClick={this.props.previous}>previous</button>;
    }
    return (
      <div className="pager">
        <span>
          {prevButton}
        </span>
        <span>
          <button type="button" className="next" onClick={this.props.next}>next</button>
        </span>
      </div>
    );
  }
}

export default Pager;
