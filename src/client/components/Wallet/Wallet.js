import React, { Component } from 'react';
import ControlNavSide from '../Navbar/ControlNavSide';
import ControlNavTop from '../Navbar/ControlNavTop';
import { Route, Switch } from 'react-router-dom';
import routes from '../../routes';
import Overview from './Overview';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPrivkey, setPubkey } from '../../../store/actions';
import KeyContainer from './KeyContainer';
import WalletSetup from './WalletSetup';
import AddTrustline from './AddTrustline';
import TrustManager from './TrustManager';
import Pay from './Pay';
import TransactionHistory from './TransactionHistory';
import PathManager from './PathManager';
import XLMHistory from './XLMHistory';

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    privkey: state.user.privkey,
    pubkey: state.user.pubkey
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setPrivkey: setPrivkey,
  setPubkey: setPubkey
}, dispatch);

/*
  Primary wallet component with routing and login
*/
class Wallet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.privkey) {
      return (
        <div>
          <ControlNavTop loggedIn={ this.props.loggedIn } />
          <ControlNavSide loggedIn={ this.props.loggedIn } pubkey={ this.props.pubkey } />
          <WalletSetup>
            <Switch>
              <Route path="/wallet" exact={ true } component={ Overview } />
              <Route path="/wallet/trustline" component={ AddTrustline } />
              <Route path="/wallet/trustlines" component={ TrustManager } />
              <Route path="/wallet/pay" component={ Pay } />
              <Route path="/wallet/paths" component={ PathManager } />
              <Route path="/wallet/txhistory" component={ TransactionHistory } />
              <Route path="/wallet/xlmhistory" component={ XLMHistory } />
            </Switch>
          </WalletSetup>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar fixed={ true } />
          <KeyContainer setPrivkey={ this.props.setPrivkey } setPubkey={ this.props.setPubkey } />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
