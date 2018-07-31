import React, { Component } from 'react';
import { fetchGet } from '../helper';
import Loader from '../Misc/Loader';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stellar from './helpers/stellarHelper';
import { hasLoaded, loadAccount, setTrustlines } from '../../../store/actions';
import AccountNotCreated from './AccountNotCreated';

const mapStateToProps = state => {
  return {
    privkey: state.user.privkey,
    pubkey: state.user.pubkey,
    loaded: state.user.loaded,
    account: state.user.account
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  hasLoaded: hasLoaded,
  loadAccount: loadAccount,
  setTrustlines: setTrustlines
}, dispatch);

class WalletSetup extends Component {
  constructor(props) {
    super(props);

    let redirect = this.props.redirect;
    if (!this.props.redirect) {
      redirect = "/wallet";
    }

    this.loadAccount = this.loadAccount.bind(this);
    this.state = {
      accountIsValid: true,
      redirect: redirect
    }
  }

  loadAccount() {
    stellar.loadAccount(this.props.pubkey).then((acc) => {
      this.setState({ accountIsValid: true, loaded: true });
      this.props.hasLoaded(true);
      this.props.loadAccount(acc);

      stellar.loadTrustlines(acc.balances).then(trustlines => {
        this.props.setTrustlines(trustlines);
      });
    }).catch((e) => {
      //console.log(e);
      this.setState({ accountIsValid: false, loaded: true });
      this.props.hasLoaded(true);
    });
  }

  componentDidMount() {
    if (!this.props.loaded) {
      this.loadAccount();
    }
  }

  render() {
    if (!this.props.loaded) {
      return (
        <div className="cp-container">
          <div className="loader-container">
            <Loader />
          </div>
        </div>
      );
    } else if (!this.props.account) {
      return (
        <div className="cp-container">
          <AccountNotCreated loadAccount={this.loadAccount} />
        </div>
      );
    } else {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          { console.log(this.props.account) }
          { this.props.children }
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletSetup);
