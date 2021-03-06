import React, { Component } from 'react';
import * as stellar from './helpers/stellarHelper';
import Loader from '../Misc/Loader';

const styles = [
  {
    backgroundColor: '#f5f7fa'
  },
  {
    backgroundColor: 'white'
  }
]

/*
  Debt settlement component.  Loads total owed amount from balances.
*/
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
      [this.props.issuer]: ''
    }
  }

  max(e) {
    this.setState({ [this.props.issuer]: this.props.balance });
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
        if (parseFloat(this.state[this.props.issuer]) / parseFloat(offer.price) > parseFloat(offer.amount)) {
          M.toast({ html: 'Error: The target user only has ' + offer.amount + ' XLM up for exchange.', classes: 'error-toast' });
        } else {
          this.props.setXLMOffer(offer, this.state[this.props.issuer]);
          M.Modal.getInstance(document.getElementById('settlementmodal')).open();
        }
      } else {
        if ( this.mounted ) {
          this.setState({ loading: false });
        }
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
    stellar.settleDebt(this.props.privkey, this.props.issuer, this.state[this.props.issuer])
    .then(res => {
      if (this.mounted) {
        this.setState({ loading: false, [this.props.issuer]: '' });
        stellar.loadAccount(this.props.pubkey).then(acc => {
          this.props.loadAccount(acc);
        });
      }
      M.toast({ html: 'Success: Transaction submitted', classes: 'success-toast' });
    }).catch(err => {
      if (this.mounted) {
        this.setState({ loading: false, [this.props.issuer]: '' });
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
          <div className="row valign-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="input-field" style={{width: '60%'}}>
              <i className="material-icons prefix">attach_money</i>
              <input id={ this.props.issuer } type="number" className="validate" value={ this.state[this.props.issuer] } onChange={ this.handleChange } />
              <label className={ (this.state[this.props.issuer]) ? 'active' : '' } htmlFor={ "" + this.props.issuer + "" }>Amount</label>
              <span className="helper-text">Debt to be cleared</span>
            </div>
            <a className="waves-effect waves-light btn-small" onClick={ this.max } style={{ marginLeft: '15px' }}>Max</a>
          </div>
          <div className="row center-align" style={{ padding: '0px 10px 0px 10px' }}>
            <p>
              <label>
                <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                <span>
                  <b>Warning:</b> Are you sure you want to do this?  This action will be
                  broadcast to the Stellar network and is irreversible.
                </span>
              </label>
            </p>
          </div>
          <div className="center-align" style={{ marginBottom: '25px' }}>
            <button onClick={ this.handleSubmit } className={
              (this.state[this.props.issuer] && this.state.checked) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
            } style={{ marginRight: '15px' }}>Send</button>
            <a onClick={ this.xlmExchange } className={
              (this.state[this.props.issuer] && this.state.checked) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
            } style={{ marginLeft: '15px' }}>Settle for XLM</a>
          </div>
        </form>;
    }

    return (
      <div id={ this.props.issuer } style={ styles[1] }>
        <div className="iou">
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
        {
          (this.state.expanded) ?
          <div className="iou-expansion">
            { content }
          </div> :
          <div></div>
        }
      </div>
    );
  }
}

export default IOU;
