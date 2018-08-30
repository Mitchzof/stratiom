import React, { Component } from 'react';
import Loader from '../Misc/Loader';

class AccountNotCreated extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.fundAccount = this.fundAccount.bind(this);
    this.state = {
      loading: false
    }
  }

  handleClick() {
    this.props.loadAccount();
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fundAccount() {
    this.setState({ loading: true });
    fetch("https://friendbot.stellar.org?addr=" + this.props.pubkey)
    .then((res) => {
      if (this.mounted) {
        this.props.loadAccount();
      }
    }).catch(e => {
      if (this.mounted) {
        this.setState({ loading: false });
      }
      console.log(e);
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="panel-container small">
          <div className="loader-container" style={{ paddingTop: '15vh', paddingBottom: '15vh', marginTop: '0px' }}>
            <Loader />
          </div>
        </div>
      )
    }
    return (
      <div className="panel-container small">
        <div className="panel-header" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h6>
              Activate your account
            </h6>
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
            {
              (TESTNET) ?
              <p>Note: Stratiom.io is currently running on the testnet, click the button below to fund your account</p> : <p></p>
            }
          </div>
          { (TESTNET) ?
            <div className="row center-align">
              <a onClick={ this.fundAccount } className="btn waves-effect waves-light btn-primary">Fund Account</a>
            </div> : <div></div>
          }
        </div>
      </div>
    );
  }
}

export default AccountNotCreated;
