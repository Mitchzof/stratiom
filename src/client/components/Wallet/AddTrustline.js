import React, { Component } from 'react';
import { createTrustline, loadAccount, loadTrustlines } from './helpers/stellarHelper';
import Loader from '../Misc/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAccount as loadAccountAC, setTrustlines } from '../../../store/actions';

const mapStateToProps = state => {
  return {
    privkey: state.user.privkey,
    pubkey: state.user.pubkey
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadAccount: loadAccountAC,
  setTrustlines: setTrustlines
}, dispatch);

class AddTrustline extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked: false,
      loading: false
    };
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

  handleSubmit(e) {
    e.preventDefault();
    try {
      this.setState({ loading: true });

      createTrustline(this.props.privkey, this.state.accountId).then(res => {
        loadAccount(this.props.pubkey).then(acc => {
          this.props.loadAccount(acc);
          loadTrustlines(acc.balances).then(trustlines => {
            this.props.setTrustlines(trustlines);
          })
        });
        if (this.mounted) {
          this.setState({ loading: false });
        }
        M.toast({ html: 'Success: Trustline has been created', classes: 'success-toast' });
      }).catch(e => {
        if (this.mounted) {
          this.setState({ loading: false });
        }
        M.toast({ html: 'Error: Trustline creation failed', classes: 'error-toast' });
      });
    } catch (e) {
      if (this.mounted) {
        this.setState({ loading: false });
      }
      M.toast({ html: 'Error: Invalid Account ID', classes: 'error-toast' });
    }
  }

  render() {
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
        <div className="panel-container">
          <div className="row panel-header">
            <h5>
              Create Trustline
            </h5>
          </div>
          <div className="row panel-content">
            <form className="col s10 offset-s1" onSubmit={ this.handleSubmit }>
              <div className="row">
                <p>
                  <b>Warning:</b> A trustline should only be created between you and
                  someone that you <b>trust</b>.  A trustline only enables you to receive
                  assets (debt) from another user.  In order to send assets to another user
                  he/she must establish trust to your address.  All assets created on Stratiom will
                  be based on USD for uniformity.
                </p>
                <p>
                  Upon creation of the trustline, your account will automatically create
                  an offer to buy and sell your friends asset 1:1 for your own, enabling
                  the peer-to-peer payment system.
                </p>
                <div className="input-field col s12">
                  <input id="accountId" type="text" className="validate" onChange={ this.handleChange } />
                  <label htmlFor="accountId">Account ID</label>
                </div>
              </div>
              <div className="row">
                <p>
                  <label>
                    <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                    <span>
                      I have read the above warnings and understand what trustline creation entails.
                    </span>
                  </label>
                </p>
              </div>
              <div className="center-align" style={{ marginBottom: '25px' }}>
                <button type="submit" className={
                  (this.state.accountId && this.state.checked) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
                }>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTrustline);
