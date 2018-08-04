import React, { Component } from 'react';
import * as stellar from './helpers/stellarHelper';
import Loader from '../Misc/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAccount as loadAccountAC } from '../../../store/actions';
import TrustlineModal from './TrustlineModal';

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
    this.state = {
      checked: false,
      loading: false,
      accountId: '',
      msg: '',
      memo: ''
    };
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
    this.instance.open();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });

    stellar.checkTrustlines(this.props.pubkey, this.state.accountId)
    .then(isTrusted => {
      if (isTrusted) {
        if (this.mounted) {
          this.setState({ msg: 'Direct trustline connection found.  Sending payment.' });
        }
        stellar.issueAssets(this.props.privkey, this.state.accountId, this.state.amount, this.state.memo)
        .then(res => {
          if (this.mounted) {
            this.setState({ loading: false, msg: '' });
          }
          M.toast({ html: 'Success: Payment has been sent', classes: 'success-toast' });
        }).catch(err => {
          if (this.mounted) {
            this.setState({ loading: false, msg: '' });
          }
          console.log(err);
          M.toast({ html: 'Error: Payment failed to send', classes: 'error-toast' });
        });
      } else {
        if (this.mounted) {
          this.setState({ msg: 'No direct trustline connection found.  Attempting path payment.' });
        }
        stellar.attemptPathPayment(this.props.privkey, this.state.accountId, this.state.amount, this.state.memo)
        .then(res => {
          if (res) {
            if (this.mounted) {
              this.setState({ loading: false, msg: '' });
            }
            console.log(res);
            M.toast({ html: 'Success: Payment has been sent', classes: 'success-toast' });
          } else {
            console.log(res);
            if (this.mounted) {
              this.setState({ loading: false, msg: '' });
            }
            M.toast({ html: 'Error: There is no payment path that reaches the specified account', classes: 'error-toast' });
          }
        }).catch(err => {
          console.log(err);
          if (this.mounted) {
            this.setState({ loading: false, msg: '' });
          }
          M.toast({ html: 'Error: Payment failed to send', classes: 'error-toast' });
        });
      }
    }).catch(err => {
      console.log(err);
      this.setState({ loading: false });
      M.toast({ html: 'Error: Invalid Account ID', classes: 'error-toast' });
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="cp-container">
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
        <div className="panel-container small">
          <div className="row panel-header">
            <h5>
              Send Funds
            </h5>
          </div>
          <div className="row panel-content">
            <form className="col s10 offset-s1" onSubmit={ this.handleSubmit }>
              <div className="row valign-wrapper">
                <div className="input-field col s12" style={{ marginLeft: '0px' }}>
                  <i className="material-icons prefix">person</i>
                  <input id="accountId" type="text" value={ this.state.accountId } className="validate" onChange={ this.handleChange } />
                  <label className={ (this.state.accountId) ? 'active' : '' } htmlFor="accountId">Account ID</label>
                </div>
                <a onClick={ this.selectTrustline } className="waves-effect waves-light btn-small" style={{ marginLeft: '15px', padding: '0px 10px 0px 10px', width: '70px' }}>Select</a>
              </div>
              <div className="row valign-wrapper">
                <div className="input-field col s12">
                  <i className="material-icons prefix">attach_money</i>
                  <input id="amount" type="text" className="validate" onChange={ this.handleChange } />
                  <label htmlFor="amount">Amount</label>
                </div>
              </div>
              <div className="row valign-wrapper">
                <div className="input-field col s12">
                  <i className="material-icons prefix"></i>
                  <input id="memo" type="text" className="validate" onChange={ this.handleChange } />
                  <label htmlFor="memo">Note (optional)</label>
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
        <TrustlineModal balances={ this.props.account.balances } fill={ this.fill } />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
