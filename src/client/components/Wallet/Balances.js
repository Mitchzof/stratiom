import React, { Component } from 'react';

class Balances extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="balance-container">
        <div className="header-container">
          <div style={{ fontSize: '18px' }}>Balances</div>
        </div>
        <div className="content">
          <div className="balance-box">
            <div className="currency">Lumens</div>
            <div className="balance"><i>{ this.props.xlm } XLM</i></div>
          </div>
          <div className="balance-box">
            <div className="currency">Stratiom</div>
            <div className="balance"><i style={{ color: 'green' }}>${ this.props.debts }</i></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Balances;
