import React, { Component } from 'react';
import { loadAccount } from './helpers/stellarHelper';
import Loader from '../Misc/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAccount as loadAccountAC } from '../../../store/actions';
import IOU from './IOU';
import XLMSettlementModal from './XLMSettlementModal';

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

/*
  Loads IOU components for each Stratiom asset held with > 0 balance
*/
class IOUManager extends Component {
  constructor(props) {
    super(props);
    this.setXLMOffer = this.setXLMOffer.bind(this);
    this.state = {
      loading: false,
      id: '',
      amount: '',
      price: '',
      offerId: ''
    };
  }

  setXLMOffer(offer, amount) {
    this.setState({ offerId: offer.id, id: offer.buying.asset_issuer, amount: amount, price: offer.price });
  }

  componentDidMount() {
    this.mounted = true;
    let elem = document.getElementById('settlementmodal');
    M.Modal.init(elem);
    this.instance = M.Modal.getInstance(elem);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let rows = []

    if (this.props.account) {
      this.props.account.balances.forEach(asset => {
        if (parseFloat(asset.balance) > 0 && asset.asset_issuer != "native" && asset.asset_code == "STRTMUSD") {
          rows.push(<IOU key={ asset.asset_issuer } balance={ asset.balance } issuer={ asset.asset_issuer }
            loadAccount={ this.props.loadAccount } privkey={ this.props.privkey } pubkey={ this.props.pubkey } setXLMOffer={ this.setXLMOffer }/>);
        }
      });
    }

    if (this.state.loading) {
      return (
        <div className="loader-container">
          <Loader />
        </div>
      );
    }

    return (
      <div className="iou-container">
        <div className="panel-header">
          <h6>
            Payment Manager
          </h6>
        </div>
        <div className="iou-content">
          { (rows.length > 0) ? rows : <div className="no-iou-container"><p>You are not currently owed any money</p></div> }
        </div>
        <XLMSettlementModal id={ this.state.id } privkey={ this.props.privkey }
          amount={ this.state.amount } price={ this.state.price } loadAccount={ this.props.loadAccount } offerId={ this.state.offerId }/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IOUManager);
