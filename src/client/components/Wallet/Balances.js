import React, { Component } from 'react';

class Balances extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="balance-container">
        <div className="header-container">
          <h5>Balances</h5>
        </div>
        <div className="content">
          <div className="xlm-balance">
            <p>Lumens:</p>
            <i>{ this.props.xlm } XLM</i>
          </div>
          <div className="stratiom-balance">
            <p>Stratiom Balance:</p>
            <i><a>${ this.props.debts }</a> USD</i>
          </div>
        </div>
      </div>
    );
  }
}

export default Balances;
