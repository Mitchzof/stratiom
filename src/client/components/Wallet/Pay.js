import React, { Component } from 'react';
import * as stellar from './helpers/stellarHelper';
import Loader from '../Misc/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAccount as loadAccountAC } from '../../../store/actions';
import TrustlineModal from './TrustlineModal';
import PayTracker from './PayTracker';

const mapStateToProps = state => {
  return {
    privkey: state.user.privkey,
    pubkey: state.user.pubkey,
    trustlines: state.user.trustlines,
    account: state.user.account
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadAccount: loadAccountAC
}, dispatch);

class Pay extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectTrustline = this.selectTrustline.bind(this);
    this.fill = this.fill.bind(this);
    this.setStep = this.setStep.bind(this);
    this.next = this.next.bind(this);
    this.state = {
      checked: false,
      loading: false,
      accountId: '',
      msg: '',
      memo: '',
      amount: '',
      step: 1
    };
  }

  setStep(e) {
    if (parseInt(e.target.id) < this.state.step) {
      this.setState({ step: parseInt(e.target.id) });
    }
  }

  componentDidMount() {
    this.mounted = true;

    let elem = document.getElementById('trustlinemodal');
    M.Modal.init(elem);
    this.instance = M.Modal.getInstance(elem);
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

  fill(accountId) {
    this.setState({ accountId: accountId });
  }

  selectTrustline() {
    let elem = document.getElementById('trustlinemodal');
    M.Modal.init(elem);
    this.instance = M.Modal.getInstance(elem);

    this.instance.open();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true, checked: false });

    stellar.checkTrustlines(this.props.pubkey, this.state.accountId)
    .then(isTrusted => {
      if (isTrusted) {
        if (this.mounted) {
          this.setState({ msg: 'Direct trustline connection found.  Sending payment.' });
        }
        stellar.issueAssets(this.props.privkey, this.state.accountId, this.state.amount, this.state.memo)
        .then(res => {
          if (this.mounted) {
            this.setState({ loading: false, msg: '', accountId: '' });
          }
          M.toast({ html: 'Success: Payment has been sent', classes: 'success-toast' });
        }).catch(err => {
          if (this.mounted) {
            this.setState({ loading: false, msg: '', accountId: '' });
          }
          console.log(err);
          if (err.message.startsWith('Text should be')) {
            M.toast({ html: 'Error: Note is too long', classes: 'error-toast' });
          } else {
            M.toast({ html: 'Error: Payment failed to send', classes: 'error-toast' });
          }
        });
      } else {
        if (this.mounted) {
          this.setState({ msg: 'No direct trustline connection found.  Attempting path payment.' });
        }
        stellar.attemptPathPayment(this.props.privkey, this.state.accountId, this.state.amount, this.state.memo)
        .then(res => {
          if (res) {
            if (this.mounted) {
              this.setState({ loading: false, msg: '', accountId: '', amount: '', step: 1 });
            }
            M.toast({ html: 'Success: Payment has been sent', classes: 'success-toast' });
          } else {
            if (this.mounted) {
              this.setState({ loading: false, msg: '', accountId: '', amount: '', step: 1 });
            }
            M.toast({ html: 'Error: There is no payment path that reaches the specified account', classes: 'error-toast' });
          }
        }).catch(err => {
          console.log(err.data);
          console.log(err.message);
          if (this.mounted) {
            this.setState({ loading: false, msg: '', step: 1 });
          }
          M.toast({ html: 'Error: Payment failed to send', classes: 'error-toast' });
        });
      }
    }).catch(err => {
      console.log(err);
      this.setState({ loading: false, step: 1 });
      M.toast({ html: 'Error: Invalid Account ID', classes: 'error-toast' });
    })
  }

  next() {
    this.setState({ step: this.state.step + 1 });
  }

  render() {
    var content = <div></div>
    if (this.state.step == 1) {
      content = <div className="panel-container small">
        <div className="row panel-header">
          <h6>
            Account ID
          </h6>
        </div>
        <div className="row panel-content">
          <form className="col s10 offset-s1">
            <div className="row center-align">
              <p>
                Please enter the receiving account ID or select from your trustlines, and continue to the next step.
              </p>
            </div>
            <div className="row valign-wrapper">
              <div className="input-field col s12" style={{ marginLeft: '0px' }}>
                <i className="material-icons prefix">person</i>
                <input id="accountId" type="text" value={ this.state.accountId } className="validate" onChange={ this.handleChange } />
                <label className={ (this.state.accountId) ? 'active' : '' } htmlFor="accountId">Account ID</label>
              </div>
              <a onClick={ this.selectTrustline } className="waves-effect waves-light btn-small" style={{ marginLeft: '15px', padding: '0px 10px 0px 10px', width: '70px' }}>Select</a>
            </div>
            <div className="center-align" style={{ marginBottom: '25px' }}>
              <a onClick={ this.next } className={
                (this.state.accountId) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
              }>Continue</a>
            </div>
          </form>
        </div>
      </div>
    } else if (this.state.step == 2) {
      content = <div className="panel-container small">
        <div className="row panel-header">
          <h6>
            Amount
          </h6>
        </div>
        <div className="row panel-content">
          <form className="col s10 offset-s1">
            <div className="row center-align">
              <p>
                Please enter the amount, in USD, that you would like to send.
              </p>
            </div>
            <div className="row valign-wrapper">
              <div className="input-field col s12">
                <i className="material-icons prefix">attach_money</i>
                <input id="amount" type="number" value={ this.state.amount } className="validate" onChange={ this.handleChange } />
                <label htmlFor="amount">Amount</label>
              </div>
            </div>
            <div className="center-align" style={{ marginBottom: '25px' }}>
              <a onClick={ this.next } className={
                (this.state.accountId) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
              }>Continue</a>
            </div>
          </form>
        </div>
      </div>
    } else if (this.state.step == 3) {
      content = <div className="panel-container small">
        <div className="row panel-header">
          <h6>
            Note
          </h6>
        </div>
        <div className="row panel-content">
          <form className="col s10 offset-s1" onSubmit={ this.next }>
            <div className="row center-align">
              <p>
                If you would like to add a short note for the transaction, please specify it here.  This note will be seen by both
                you and the receiver.
              </p>
            </div>
            <div className="row valign-wrapper">
              <div className="input-field col s12">
                <input id="memo" type="text" className="validate" value={ this.state.memo } onChange={ this.handleChange } maxLength="28"/>
                <label htmlFor="memo">Note (optional)</label>
              </div>
            </div>
            <div className="center-align" style={{ marginBottom: '25px' }}>
              <a onClick={ this.next } className={
                (this.state.accountId) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
              }>Continue</a>
            </div>
          </form>
        </div>
      </div>
    } else if (this.state.step == 4) {
      content = <div className="panel-container small">
        <div className="row panel-header">
          <h6>
            Review Transaction
          </h6>
        </div>
        <div className="row panel-content">
          <form className="col s10 offset-s1" onSubmit={ this.handleSubmit }>
            <div className="row">
              <p>
                Please review your transaction details, and verify that you would like to submit this transaction.
              </p>
            </div>
            <div className="row valign-wrapper">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input disabled id="accountId" type="text" value={ this.state.accountId } className="validate"/>
                <label className="active" htmlFor="accountId">Account ID</label>
              </div>
            </div>
            <div className="row valign-wrapper">
              <div className="input-field col s12">
                <i className="material-icons prefix">attach_money</i>
                <input disabled id="amount" type="number" value={ this.state.amount } className="validate"/>
                <label className="active" htmlFor="amount">Amount</label>
              </div>
            </div>
            <div className="row valign-wrapper">
              <div className="input-field col s12">
                <i className="material-icons prefix"></i>
                <input disabled id="memo" type="text" className="validate" value={ this.state.memo } maxLength="28"/>
                <label className="active" htmlFor="memo">Note (optional)</label>
              </div>
            </div>
            <div className="row valign-wrapper">
              <p>
                <label>
                  <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                  <span>
                    <b>Warning:</b> Transactions on the Stellar network are irreversible.  Are
                    you sure you want to broadcast this payment?
                  </span>
                </label>
              </p>
            </div>
            <div className="center-align" style={{ marginBottom: '25px' }}>
              <button type="submit" className={
                (this.state.accountId && this.state.amount && this.state.checked) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
              }>Send</button>
            </div>
          </form>
        </div>
      </div>
    }

    if (this.state.loading) {
      return (
        <div className="cp-container">
          <PayTracker step={ this.state.step } setStep={ this.setStep } />
          <div className="loader-container">
            <Loader />
          </div>
          <div className="row center-align">
            <p>{this.state.msg}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="cp-container">
        <PayTracker step={ this.state.step } setStep={ this.setStep } />
        { content }
        <TrustlineModal balances={ this.props.account.balances } fill={ this.fill } />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
