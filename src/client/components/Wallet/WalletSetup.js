import React, { Component } from 'react';
import { fetchGet } from '../helper';
import Loader from '../Misc/Loader';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stellar from './helpers/stellarHelper';
import { hasLoaded, loadAccount } from '../../../store/actions';
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
  loadAccount: loadAccount
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
    if (!this.props.loaded) {
      stellar.loadAccount(this.props.pubkey).then((acc) => {
        this.setState({ accountIsValid: true, loaded: true });
        this.props.hasLoaded(true);
        this.props.loadAccount(acc);
      }).catch((e) => {
        //console.log(e);
        this.setState({ accountIsValid: false, loaded: true });
        this.props.hasLoaded(true);
      });
    }
  }

  componentDidMount() {
    this.loadAccount();
  }

  componentDidUpdate() {
    this.loadAccount();
  }

  render() {
    if (!this.props.loaded) {
      return (
        <div className="loader-container">
          <Loader />
        </div>
      );
    } else if (!this.props.account) {
      return (
        <div className="cp-container">
          <AccountNotCreated hasLoaded={this.props.hasLoaded} />
        </div>
      );
    } else {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          { this.props.children }
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletSetup);
