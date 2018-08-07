import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StellarSdk from 'stellar-sdk';

const selectedStyle = {
  backgroundColor: '#3f7bde',
  color: 'white'
}

const unselectedStyle = {
  backgroundColor: '#fff',
  color: 'black'
}

class KeyInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      checked: false
    };
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
      let keypair = StellarSdk.Keypair.fromSecret(this.state.privkey);
      this.props.setPrivkey(this.state.privkey);
      this.props.setPubkey(keypair.publicKey());
    } catch (e) {
      M.toast({ html: 'Error: Invalid private key', classes: 'error-toast' });
    }
  }

  render() {
    if (this.props.method == 'privkey') {
      return (
        <div className="privkey-panel valign-wrapper">
          <form className="col s10 offset-s1" onSubmit={ this.handleSubmit }>
            <div className="row center-align">
              <h6 style={{ marginTop: '40px', marginBottom: '15px' }}>
                Enter your secret key to access the dashboard.
              </h6>
              <div className="input-field col s12">
                <input id="privkey" type="password" className="validate" onChange={ this.handleChange } />
                <label htmlFor="privkey">Private Key</label>
              </div>
            </div>
            <div className="row">
              <p>
                <label>
                  <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                  <span>
                    I have read and agree to both the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
                  </span>
                </label>
              </p>
            </div>
            <div className="center-align" style={{ marginBottom: '25px' }}>
              <button type="submit" className={
                (this.state.privkey && this.state.checked) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
              }>Submit</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="privkey-panel valign-wrapper">
          <div className="col s10 offset-s1">
            <div className="row center-align">
              <img className="ledger-logo-container" src="/assets/ledger-logo.png" />
            </div>
            <div className="row center-align">
              <p>
                Integration coming soon.
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default KeyInput;
