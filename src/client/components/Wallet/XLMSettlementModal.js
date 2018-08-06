import React, { Component } from 'react';
import * as stellar from './helpers/stellarHelper';
import Loader from '../Misc/Loader';

class XLMSettlementModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      checked: false,
      loading: false
    }
  }

  handleChange(e) {
    if (e.target.id == "check") {
      this.setState({ checked: !this.state.checked });
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleSubmit() {
    this.setState({ loading: true })
    stellar.exchangeForXLM(this.props.privkey, this.props.price, this.props.amount, this.props.id)
    .then(res => {
      if (this.mounted) {
        this.setState({ loading: false, checked: false });
        stellar.loadAccount(stellar.privkeyToPubkey(this.props.privkey)).then(acc => {
          this.props.loadAccount(acc);
        });
        M.Modal.getInstance(document.getElementById('settlementmodal')).close();
      }
      M.toast({ html: 'Success: Debt settled for XLM', classes: 'success-toast' });
    }).catch(e => {
      if (this.mounted) {
        this.setState({ loading: false });
      }
      console.log(e);
      M.toast({ html: 'Error: Failed to create order', classes: 'error-toast' });
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <div id="settlementmodal" className="modal modal-fixed-footer">
          <div className="modal-content">
            <div className="loader-container" style={{ padding: '15% 0px 50px 0px', height: '100%', marginTop: '0px' }}>
              <Loader />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div id="settlementmodal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <form className="col s10 offset-s1">
            <div className="row">
              <h6><b>Exchange Debt For XLM</b></h6>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i style={{color: 'transparent'}} className="material-icons prefix"></i>
                <input disabled value={ this.props.offerId } id="offerId" type="number" className="validate" />
                <label className="active" htmlFor="offerId">Offer ID</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6" style={{ paddingRight: '15px' }}>
                <i className="material-icons prefix">attach_money</i>
                <input disabled value={ this.props.price } id="price" type="number" className="validate" onChange={ this.handleChange } />
                <label className="active" htmlFor="price">Price</label>
                <span className="helper-text">Lumen price in USD</span>
              </div>
              <div className="input-field col s6" style={{ paddingLeft: '15px' }}>
                <input disabled value={ this.props.amount } id="amount" type="number" className="validate" onChange={ this.handleChange } />
                <label style={{ paddingLeft: '15px' }} className="active" htmlFor="amount">Amount</label>
                <span className="helper-text">The amount of debt asset to be exchanged</span>
              </div>
            </div>
            <div className="row">
              <p>
                <label>
                  <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                  <span>
                    I have reviewed the above trade details and recognize that this action cannot be reversed.
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

export default XLMSettlementModal;
