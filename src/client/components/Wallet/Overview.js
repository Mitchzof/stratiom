import React, { Component } from 'react';
import * as stellar from './helpers/stellarHelper';
import Loader from '../Misc/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAccount as loadAccountAC } from '../../../store/actions';
import Balances from './Balances';
import Stats from './Stats';
import IOUManager from './IOUManager';
import Tutorial from './Tutorial';

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
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem('tutorial')) {
      var elems = document.querySelectorAll('.modal');
      M.Modal.init(elems, { dismissible: false });

      this.instance = M.Modal.getInstance(document.getElementById('tutorial'));
      this.instance.open();

      var elems = document.querySelectorAll('.carousel');
      this.carousel = M.Carousel.init(elems, { fullWidth: true, indicators: true });
    }
  }

  next() {
    let instance = M.Carousel.getInstance(document.getElementById('tutorial-carousel'));
    if (instance.center < 7) {
      instance.next();
    }
  }

  render() {
    if (this.props.account) {
      this.debts = 0;
      this.props.account.balances.forEach(asset => {
        if (asset.asset_type == "native") {
          this.xlm = asset.balance.slice(0, asset.balance.length - 4);
        } else if (asset.asset_code == 'STRTMUSD' && parseFloat(asset.balance) > 0) {
          this.debts += parseFloat(asset.balance.slice(0, asset.balance.length - 5));
        }
      });
    }

    return (
      <div className="cp-container">
        <Tutorial next={ this.next } />
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
