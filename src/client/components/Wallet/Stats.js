import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Stats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="account-info-container">
        <div className="header-container">
          <h5>Overview</h5>
          <div className="wrapper" style={{fontSize: '18px'}}><b>Account ID:</b> <a style={{fontSize: '15px'}}>{ this.props.accountId }</a></div>
        </div>
        <div className="content">
          <div className="button-box">
            <div className="button-container">
              <Link to="/wallet/pay">
                <div className="btn-floating btn-large waves-effect waves-light blue-button"><i className="material-icons">send</i></div>
              </Link>
              <p>Send Payment</p>
            </div>
            <div className="button-container">
              <div className="btn-floating btn-large waves-effect waves-light white-button"><i className="material-icons">compare_arrows</i></div>
              <p>Link XLM</p>
            </div>
            <div className="button-container">
              <div className="btn-floating btn-large waves-effect waves-light blue-button"><i className="material-icons">edit</i></div>
              <p>Inflation</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;