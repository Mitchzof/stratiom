import React, { Component } from 'react';
import { connect } from 'react-redux';
import PassiveOffer from './PassiveOffer';
import Loader from '../Misc/Loader';
import { loadAccount as loadAccountAC } from '../../../store/actions';
import { bindActionCreators } from 'redux';
import CreateOfferModal from './CreateOfferModal';
import OfferModal from './OfferModal';

const mapStateToProps = state => {
  return {
    account: state.user.account,
    privkey: state.user.privkey
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadAccount: loadAccountAC
}, dispatch);

/*
  Manager for payment mediation.  Supports the creation / editing of passive offers.
*/
class PathManager extends Component {
  constructor(props) {
    super(props);
    this.counter = 0;
    this.offers = [];
    this.loadOffers = this.loadOffers.bind(this);
    this.openModal = this.openModal.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.state = {
      loading: true,
      target: ''
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.target = this.target.bind(this);
    this.props.account.offers({ order: "desc", limit: 100 }).then(offers => {
      this.loadOffers(offers);
    }).catch(e => {
      setTimeout(this.forceUpdate, 1500);
    })
  }

  loadOffers(offers) {
    if (offers.records.length > 0) {
      this.offers = this.offers.concat(offers.records);
      offers.next().then(offers => {
        this.loadOffers(offers);
      });
    } else {
      if (this.mounted) {
        this.setState({ loading: false });
        let elem = document.getElementById('trustlinemodal');
        M.Modal.init(elem);
        let info = document.getElementById('info');
        M.Modal.init(info);
        this.instance = M.Modal.getInstance(elem);
      }
    }
  }

  clearFields() {
    this.setState({ loading: false });
    this.offers = [];
    this.props.account.offers({ order: "desc", limit: 100 }).then(offers => {
      this.loadOffers(offers);
    }).catch(e => {
      setTimeout(this.forceUpdate, 1500);
    });
  }

  target(accountId) {
    this.setState({ target: accountId });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  openModal() {
    this.instance.open();
  }

  render() {
    let rows = [];

    this.offers.forEach(offer => {
      if (offer.buying.asset_code == 'STRTMUSD' && offer.selling.asset_code == 'STRTMUSD') {
        rows.push(<PassiveOffer key={ offer.id } offer={ offer } privkey={ this.props.privkey } loadAccount={ this.props.loadAccount } />);
      }
    })

    if (this.state.loading) {
      return (
        <div className="cp-container">
          <div className="loader-container">
            <Loader />
          </div>
        </div>
      );
    }

    return (
      <div className="cp-container">
        <div className="offer-container">
          <div className="offer-header" style={{ display: 'flex', 'justifyContent': 'space-between' }}>
            <h5>
              Payment Mediation Manager
            </h5>
            <a href="#info" className="modal-trigger info"><i className="material-icons">info_outline</i></a>
          </div>
          <div className="content">
            { (rows.length > 0) ?
              <div className="passive-offer" style={{ background: 'white', borderTop: '0px solid rgba(119, 119, 119, 0.08)' }}>
                <div className="offer-content info" style={{ width: '70%', minWidth: '75px' }}><p>Account</p></div>
                <div className="offer-content info" style={{ width: '15%', minWidth: '75px' }}><p>Amount</p></div>
                <div className="offer-content info" style={{ width: '10%', minWidth: '50px' }}><p>Price</p></div>
              </div> : <div></div>
            }
            {
              (rows.length > 0) ? rows :
              <div className="row center-align" style={{ marginBottom: '0px' }}><div style={{ fontSize: '17px', backgroundColor: 'white', height: '100%', padding: '30px 0px 30px 0px'}}>
                You are not currently mediating payments for any accounts</div>
              </div>
            }
            <div className="passive-offer" style={{ background: 'white', borderTop: '1px solid rgba(0, 0, 0, 0.15)', display: 'flex', justifyContent: 'center', height: '60px' }}>
              <a className="btn btn-small waves-effect waves-light" onClick={ this.openModal }><i className="material-icons">add</i></a>
            </div>
          </div>
        </div>
        <CreateOfferModal target={ this.target } />
        <OfferModal privkey={ this.props.privkey } accountId={ this.state.target } clear={ this.clearFields } />
        <div id="info" className="modal">
          <div className="modal-content">
            <p>This component allows you to manage passive offers that have been placed on the SDEX for the purpose of payment mediation.</p>
            <p>Account ID represents the trustline you are mediating payments for, amount is the total you are willing to mediate, and price is the exchange rate
            of your debt asset to the trustlines debt asset.</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-dark btn-flat">Close</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PathManager);
