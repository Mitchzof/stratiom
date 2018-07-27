import React, { Component } from 'react';
import ControlNavSide from '../Navbar/ControlNavSide';
import ControlNavTop from '../Navbar/ControlNavTop';
import { Route, Switch } from 'react-router-dom';
import routes from '../../routes';
import Overview from './Overview';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPrivkey } from '../../../store/actions';
import KeyInput from './KeyInput';
import KeyLink from '../Key/KeyLink';
import Key from '../Key/Key';

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    privkey: state.user.privkey
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setPrivkey: setPrivkey
}, dispatch);

class Wallet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.privkey) {
      return (
        <div>
          <ControlNavTop loggedIn={ this.props.loggedIn } />
          <ControlNavSide loggedIn={ this.props.loggedIn } />
          <Switch>
            <Route path="/wallet" exact={ true } component={ Overview } />
            <Route path="/wallet/key" component={ Key } />
          </Switch>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar fixed={ true } />
          <div className="container valign-wrapper" style={{ minHeight: '100vh' }}>
            <div className="row">
              <div className="col">
                <KeyInput dispatch={ this.props.setPrivkey }/>
                <KeyLink />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
