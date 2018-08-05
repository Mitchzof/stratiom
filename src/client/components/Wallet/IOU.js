import React, { Component } from 'react';
import * as stellar from './helpers/stellarHelper';
import Loader from '../Misc/Loader';

class IOU extends Component {
  constructor(props) {
    super(props);
    this.expand = this.expand.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.max = this.max.bind(this);
    this.xlmExchange = this.xlmExchange.bind(this);
    this.state = {
      expanded: false,
      loading: false,
      checked: false,
      amount: ''
    }
  }

  max(e) {
    this.setState({ amount: this.props.balance });
    M.updateTextFields();
  }

  expand(e) {
    this.setState({ expanded: !this.state.expanded });
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  xlmExchange() {
    this.setState({ loading: true });
    stellar.loadXLMOffer(this.props.issuer).then(offer => {
      if (offer) {
        if ( this.mounted ) {
          this.setState({ loading: false });
        }
        if (parseFloat(this.state.amount) / parseFloat(offer.price) > parseFloat(offer.amount)) {
          M.toast({ html: 'Error: The target user only has ' + offer.amount + ' XLM up for exchange.', classes: 'error-toast' });
        } else {
          this.props.setXLMOffer(offer, this.state.amount);
          M.Modal.getInstance(document.getElementById('settlementmodal')).open();
        }
      } else {
        M.toast({ html: 'Error: User does not support XLM settlement', classes: 'error-toast' });
      }
    }).catch(e => {
      if (this.mounted) {
        this.setState({ loading: true });
      }
      console.log(e);
      M.toast({ html: 'Error: Failed to load offers from network', classes: 'error-toast' });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    stellar.settleDebt(this.props.privkey, this.props.issuer, this.state.amount)
    .then(res => {
      if (this.mounted) {
        this.setState({ loading: false, amount: '' });
        stellar.loadAccount(this.props.pubkey).then(acc => {
          this.props.loadAccount(acc);
        });
      }
      M.toast({ html: 'Success: Transaction submitted', classes: 'success-toast' });
    }).catch(err => {
      if (this.mounted) {
        this.setState({ loading: false, amount: '' });
      }
      M.toast({ html: 'Error: Transaction failed to submit', classes: 'error-toast' });
    });
  }

  handleChange(e) {
    if (e.target.id == "check") {
      this.setState({ checked: !this.state.checked });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  }

  render() {
    var content;

    if (this.state.loading) {
      content = <div className="loader-container" style={{ marginTop: '50px', marginBottom: '50px' }}>
          <Loader />
        </div>
    } else {
      content = <form className="col s10 offset-s1">
          <div className="row valign-wrapper">
            <div className="input-field col s6 offset-s2">
              <i className="material-icons prefix">attach_money</i>
              <input id="amount" type="number" className="validate" value={ this.state.amount } onChange={ this.handleChange } style={{ borderBottom: '1px solid #505558' }} />
              <label className={ (this.state.amount) ? 'active' : '' } htmlFor="amount" style={{ color: '#505558' }}>Amount</label>
              <span className="helper-text">Debt to be cleared</span>
            </div>
            <a className="waves-effect waves-light btn-small" onClick={ this.max } style={{ marginLeft: '15px' }}>Max</a>
          </div>
          <div className="row center-align">
            <p>
              <label>
                <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                <span style={{ color: '#505558' }}>
                  <b>Warning:</b> Are you sure you want to do this?  This action will be
                  broadcast to the Stellar network and is irreversible.
                </span>
              </label>
            </p>
          </div>
          <div className="center-align" style={{ marginBottom: '25px' }}>
            <button onClick={ this.handleSubmit } className={
              (this.state.amount && this.state.checked) ? "btn waves-effect waves-light btn-primary" : "btn disabled iou-disabled-button"
            } style={{ marginRight: '15px' }}>Send</button>
            <a onClick={ this.xlmExchange } className={
              (this.state.amount && this.state.checked) ? "btn waves-effect waves-light btn-primary" : "btn disabled iou-disabled-button"
            } style={{ marginLeft: '15px' }}>Settle for XLM</a>
          </div>
        </form>;
    }

    return (
      <div>
        <div className="iou" id={ this.props.issuer }>
          <div style={{maxWidth: '100%'}}><p><b>Account:</b> { this.props.issuer }</p></div>
          <div>
            <p><b>Owes You:</b>
              <i style={{color:'green', marginLeft: '5px'}}>${ this.props.balance.slice(0, this.props.balance.length - 5) }</i>
            </p>
          </div>
          <a className="dropdown" onClick={ this.expand }>
            {
              (this.state.expanded) ?
              <i className="material-icons">arrow_drop_up</i> :
              <i className="material-icons">arrow_drop_down</i>
            }
          </a>
        </div>
        <div className="iou-expansion" style={{ maxHeight: (this.state.expanded) ? '500px' : '0px' }}>
          { content }
        </div>
      </div>
    );
  }
}

export default IOU;
