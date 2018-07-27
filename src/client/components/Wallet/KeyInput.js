import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StellarSdk from 'stellar-sdk';

let formStyle = {
  marginTop: '-40px'
}

class KeyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
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
      <div className="privkey-panel center-align valign-wrapper">
        <form className="col s10 offset-s1" style={ formStyle } onSubmit={ this.handleSubmit }>
          <div className="row">
            <h4 style={{ paddingTop: '25px' }}>Set Private Key</h4>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="privkey" type="password" className="validate" onChange={ this.handleChange } />
              <label htmlFor="privkey">Private Key</label>
            </div>
          </div>
          <button type="submit" className={
            (this.state.privkey) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
          }>Submit</button>
        </form>
      </div>
    );
  }
}

export default KeyInput;
