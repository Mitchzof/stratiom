import React, { Component } from 'react';
import * as stellar from './helpers/stellarHelper.js';
import Loader from '../Misc/Loader';
import { loadAccount as loadAccountAC } from '../../../store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    account: state.user.account,
    privkey: state.user.privkey
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadAccount: loadAccountAC
}, dispatch);

class LinkXLM extends Component {
  constructor(props) {
    super(props);
    this.offers = [];
    this.reload = this.reload.bind(this);
    this.loadOffers = this.loadOffers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createOffer = this.createOffer.bind(this);
    this.modifyOffer = this.modifyOffer.bind(this);
    this.state = {
      loading: true,
      checked: false,
      price: 'loading...',
      amount: '',
      offerLoaded: false
    }
  }

  handleChange(e) {
    if (e.target.id == "check") {
      this.setState({ checked: !this.state.checked });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.props.account.offers({ order: "desc", limit: 100 }).then(offers => {
      this.loadOffers(offers);
    }).catch(e => {
      console.log(e);
    });

    fetch('https://min-api.cryptocompare.com/data/price?fsym=XLM&tsyms=USD')
    .then(data => data.json())
    .then(price => {
      this.setState({ price: price.USD })
    })
  }

  reload() {
    this.offers = [];
    this.setState({ loading: true });
    fetch('https://min-api.cryptocompare.com/data/price?fsym=XLM&tsyms=USD')
    .then(data => data.json())
    .then(price => {
      this.setState({ price: price.USD })
    });
    this.props.account.offers({ order: "desc", limit: 100 }).then(offers => {
      this.loadOffers(offers);
    }).catch(e => {
      setTimeout(this.forceUpdate, 1500);
    });
  }

  loadOffers(offers) {
    if (offers.records.length > 0) {
      offers.records.forEach(offer => {
        if (offer.buying.asset_issuer == this.props.account.account_id && offer.selling.asset_type == 'native') {
          this.offer = offer;
          this.setState({ amount: offer.amount, price: offer.price });
        }
      })
      offers.next().then(offers => {
        this.loadOffers(offers);
      });
    } else {
      if (this.mounted) {
        this.setState({ loading: false });
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  modifyOffer() {
    this.setState({ loading: true });
    stellar.linkXLM(this.props.privkey, this.state.price, this.state.amount, this.offer.id).then(res => {
      if (this.mounted) {
        this.setState({ loading: false, checked: false, price: 'loading...', amount: '' });
        this.offer = null;
        this.reload();
      }
      M.toast({ html: 'Success: Your offer has been modified', classes: 'success-toast' });
    }).catch(e => {
      if (this.mounted) {
        this.setState({ loading: false });
      }
      M.toast({ html: 'Error: Offer modification failed', classes: 'error-toast' });
    });
  }

  createOffer() {
    this.setState({ loading: true });
    stellar.linkXLM(this.props.privkey, this.state.price, this.state.amount).then(res => {
      if (res) {
        if (this.mounted) {
          this.setState({ loading: false, checked: false });
          this.reload();
        }
        M.toast({ html: 'Success: Your offer has been created', classes: 'success-toast' });
      } else {
        if (this.mounted) {
          this.setState({ loading: false, checked: false });
        }
        M.toast({ html: 'You already have an existing offer', classes: 'success-toast' });
      }
    }).catch(e => {
      if (this.mounted) {
        this.setState({ loading: false });
      }
      M.toast({ html: 'Error: Offer submission failed', classes: 'error-toast' });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className="modal-content">
            <div className="loader-container" style={{ padding: '15% 0px 50px 0px', height: '100%', marginTop: '0px' }}>
              <Loader />
            </div>
          </div>
        </div>
      );
    } else if (this.offer) {
      return (
        <div>
          <div className="modal-content">
            <form className="col s10 offset-s1">
              <div className="row">
                <h6><b>Modify XLM Link</b></h6>
                <p>To delete your XLM Link, simply set the amount to 0.</p>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i style={{color: 'transparent'}} className="material-icons prefix"></i>
                  <input disabled value={ this.offer.id } id="offerId" type="number" className="validate" />
                  <label className="active" htmlFor="offerId">Offer ID</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6" style={{ paddingRight: '15px' }}>
                  <i className="material-icons prefix">attach_money</i>
                  <input value={ this.state.price } id="price" type="number" className="validate" onChange={ this.handleChange } />
                  <label className="active" htmlFor="price">Price</label>
                  <span className="helper-text">Valuation of XLM in USD (rate of your asset to XLM)</span>
                </div>
                <div className="input-field col s6" style={{ paddingLeft: '15px' }}>
                  <input value={ this.state.amount } id="amount" type="number" className="validate" onChange={ this.handleChange } />
                  <label style={{ paddingLeft: '15px' }} className="active" htmlFor="amount">Amount</label>
                  <span className="helper-text">The amount of XLM to buyback with</span>
                </div>
              </div>
              <div className="row">
                <p>
                  <label>
                    <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                    <span>
                      I would like to modify my offer with the provided fields.
                    </span>
                  </label>
                </p>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className={
              (this.state.checked && this.state.amount && this.state.price) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
            } onClick={ this.modifyOffer }>Submit</button>
            <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="modal-content">
            <form className="col s10 offset-s1">
              <div className="row">
                <h6><b>Link XLM</b></h6>
                <p>This action will create an offer enabling holders of your
                debt asset to exchange your debt, instantly, for native Lumens.  Note that any
                holder of your asset may exchange your asset for Lumens, making this a dangerous
                action if used improperly.</p>
              </div>
              <div className="row">
                <div className="input-field col s6" style={{ paddingRight: '15px' }}>
                  <i className="material-icons prefix">attach_money</i>
                  <input value={ this.state.price } id="price" type="number" className="validate" onChange={ this.handleChange } />
                  <label className="active" htmlFor="price">Price</label>
                  <span className="helper-text">Valuation of XLM in USD (rate of your asset to XLM)</span>
                </div>
                <div className="input-field col s6" style={{ paddingLeft: '15px' }}>
                  <input value={ this.state.amount } id="amount" type="number" className="validate" onChange={ this.handleChange } />
                  <label style={{ paddingLeft: '15px' }} className="active" htmlFor="amount">Amount</label>
                  <span className="helper-text">The amount of XLM to buyback with</span>
                </div>
              </div>
              <div className="row">
                <p>
                  <label>
                    <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                    <span>
                      I have reviewed the offer details and would like to create an offer buying my
                      debt asset for native Lumens.
                    </span>
                  </label>
                </p>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className={
              (this.state.checked && this.state.amount && this.state.price) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
            } onClick={ this.createOffer }>Submit</button>
            <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkXLM);
