import React, { Component } from 'react';
import * as stellar from './helpers/stellarHelper';
import Loader from '../Misc/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAccount as loadAccountAC } from '../../../store/actions';
import Balances from './Balances';
import Stats from './Stats';
import IOUManager from './IOUManager';

const mapStateToProps = state => {
  return {
    privkey: state.user.privkey,
    pubkey: state.user.pubkey,
    account: state.user.account,
    trustlines: state.user.trustlines
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadAccount: loadAccountAC
}, dispatch);

class Overview extends Component {
  constructor(props) {
    super(props);
    this.xlm = 0;
    this.debts = 0;
  }

  render() {
    if (this.props.account) {
      this.debts = 0;
      this.props.account.balances.forEach(asset => {
        if (asset.asset_type == "native") {
          this.xlm = asset.balance.slice(0, asset.balance.length - 4);
        } else if (asset.asset_code == 'STRTMUSD' && parseFloat(asset.balance) > 0) {
          this.debts += parseFloat(asset.balance);
        }
      });
    }

    return (
      <div className="cp-container">
        <div className="overview-panel-container">
          <Stats accountId={ this.props.account.account_id } inflation={ this.props.account.inflation_destination } privkey={ this.props.privkey } loadAccount={ this.props.loadAccount } />
          <Balances xlm={ this.xlm } debts={ this.debts } />
        </div>
        <IOUManager />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
