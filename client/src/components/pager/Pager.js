import React, {Component} from 'react';
import './Pager.scss';

class Pager extends Component {
  
  render() {
    return(
      <div className="pager">
        <button onClick={this.props.next}>next</button>
      </div>
    );
  }
}

export default Pager;
