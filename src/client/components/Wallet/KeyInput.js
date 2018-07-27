import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StellarSdk from 'stellar-sdk';

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
      StellarSdk.Keypair.fromSecret(this.state.privkey);
      this.props.dispatch(this.state.privkey);
    } catch (e) {
      console.log(e);
      M.toast({ html: 'Error: Invalid private key', classes: 'error-toast' });
    }
  }

  render() {
    return (
      <div className="privkey-panel valign-wrapper">
        <form className="col s10 offset-s1" onSubmit={ this.handleSubmit }>
          <div className="row center-align">
            <p style={{ marginTop: '40px', fontSize: '2.2vh' }}>
              Enter your secret key to access the dashboard.
            </p>
            <div className="input-field col s12">
              <input id="privkey" type="password" className="validate" onChange={ this.handleChange } />
              <label htmlFor="privkey">Private Key</label>
            </div>
          </div>
          <div className="row">
            <p>
              <label>
                <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                <span>Something something</span>
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
  }
}

export default KeyInput;
