import React, { Component } from 'react';
import { createOffers } from './helpers/stellarHelper.js';
import Loader from '../Misc/Loader';

/*
  Passive offer creation modal
*/
class OfferModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      amount: "250.00",
      price: "1",
      checked: false,
      loading: false
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let instance = M.Modal.getInstance(document.getElementById('offermodal'));
    this.setState({ loading: true });
    createOffers(this.props.privkey, this.props.accountId, this.state.amount, this.state.price)
    .then(res => {
      if (res) {
        if (this.mounted) {
          this.setState({ loading: false });
          this.props.clear();
          instance.close();
        }
        M.toast({ html: 'Success: Offer has been created', classes: 'success-toast' });
      } else {
        if (this.mounted) {
          this.setState({ loading: false });
          this.props.clear();
          instance.close();
        }
        M.toast({ html: 'You already have an offer for this asset', classes: 'success-toast' });
      }
    }).catch(err => {
      if (this.mounted) {
        this.setState({ loading: false });
        this.props.clear();
        instance.close();
      }
      M.toast({ html: 'Error: Offer creation failed', classes: 'error-toast' });
    })
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleChange(e) {
    if (e.target.id == "check") {
      this.setState({ checked: !this.state.checked });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div id="offermodal" className="modal modal-fixed-footer">
          <div className="modal-content">
            <div className="loader-container">
              <Loader />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div id="offermodal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <form className="col s10 offset-s1">
            <div className="row">
              <h6><b>Payment Mediation (Recommended)</b></h6>
              <p>
                This will create a passive order on the SDEX.  By creating this order,
                your account may passively mediate payments and send path payments through this trustline.
                Note that once the total amount specified has been mediated, a new offer must
                be created.
              </p>
              <p>
                It is recommended that you keep this value low in case the target account becomes
                compromised, which could result in unwanted issuing of your debt asset.
              </p>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input disabled value={ this.props.accountId } id="accountId" type="text" className="validate" onChange={ this.handleChange } />
                <label className="active" htmlFor="accountid">Account ID</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6" style={{ paddingRight: '15px' }}>
                <i className="material-icons prefix">attach_money</i>
                <input value={ this.state.amount } id="amount" type="number" className="validate" onChange={ this.handleChange } />
                <label className="active" htmlFor="amount">Amount</label>
                <span className="helper-text">The total amount you are willing to mediate</span>
              </div>
              <div className="input-field col s6" style={{ paddingLeft: '15px' }}>
                <input disabled value={ this.state.price } id="price" type="text" className="validate" onChange={ this.handleChange } />
                <label className="active" htmlFor="price">Price</label>
                <span className="helper-text">The ratio of the trustline{'\''}s USD to your USD</span>
              </div>
            </div>
            <div className="row">
              <p>
                <label>
                  <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                  <span>
                    I have reviewed the offer details
                  </span>
                </label>
              </p>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className={
            (this.state.checked) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
          } onClick={ this.handleSubmit }>Submit</button>
          <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
      </div>
    );
  }
}

export default OfferModal;
