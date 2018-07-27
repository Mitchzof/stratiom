import React, { Component } from 'react';
import StellarSdk from 'stellar-sdk';

class Keypair extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.privkey && this.props.pubkey) {
      return (
        <div className="keypair-panel valign-wrapper">
          <div className="col s10 offset-s1" style={{ marginTop: "20px" }}>
            <div className="row">
              Public Key
              <div className="key-container">
                { this.props.pubkey }
              </div>
            </div>
            <div className="row">
              Secret Key - <b>Warning:</b> Save and keep this secure
              <div className="key-container">
                { this.props.privkey }
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default Keypair;
