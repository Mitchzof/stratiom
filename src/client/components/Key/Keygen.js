import React, { Component } from 'react';
import StellarSdk from 'stellar-sdk';

let formStyle = {
  marginTop: '-40px'
}

class Keygen extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let keypair = StellarSdk.Keypair.random();
    this.props.submit(keypair.secret(), keypair.publicKey());
  }

  render() {
    return (
      <div className="keygen-panel center-align valign-wrapper">
        <form className="col s10 offset-s1" style={ formStyle } onSubmit={ this.handleSubmit }>
          <div className="row">
            <h4 style={{ paddingTop: '25px' }}>Generate a New Keypair</h4>
          </div>
          <button type="submit" className="btn waves-effect waves-light btn-primary">Generate</button>
        </form>
      </div>
    );
  }
}

export default Keygen;
