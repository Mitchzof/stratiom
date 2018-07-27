import React, { Component } from 'react';
import StellarSdk from 'stellar-sdk';

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
      <div className="keygen-panel valign-wrapper">
        <form className="col s10 offset-s1" onSubmit={ this.handleSubmit }>
          <div className="row center-align">
            <p style={{ marginTop: '20px', fontSize: '2.5vh' }}>
              Create a new account keypair.
            </p>
          </div>
          <div className="row">
            <p>
              <b>Public Key</b>: This is considered the account address.
              The public key acts as the account identifier, used to receive funds.
            </p>
            <p>
              <b>Private Key</b>: The private key is what controls sensitive actions from the account,
              such as sending funds.  It should be stored safely and not shared.  If the private key is lost,
              account access will, in turn, be irrecoverably lost.
            </p>
          </div>
          <div className="center-align" style={{ marginBottom: "25px" }}>
            <button type="submit" className="btn waves-effect waves-light btn-primary">Generate</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Keygen;
