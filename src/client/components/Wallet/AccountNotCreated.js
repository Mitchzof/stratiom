import React, { Component } from 'react';

class AccountNotCreated extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.loadAccount();
  }

  render() {
    return (
      <div className="panel-container">
        <div className="panel-header" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h5>
              Activate your account
            </h5>
            <a className="refresh-button" onClick={ this.handleClick }><i className="material-icons">refresh</i></a>
        </div>
        <div className="row panel-content">
          <div className="col s11">
          <p>
            Your account has not yet been activated.  In order to activate and use your
            account, you must send at least 5 Lumens (XLM) to your account.  XLM can be purchased
            and transferred to your account on a variety of cryptocurrency exchanges.
          </p>
          <p>
            Once the transaction has been completed and your account is verified.
            Click the refresh button above to reload your account from Horizon.
          </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountNotCreated;
