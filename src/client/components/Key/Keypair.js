import React, { Component } from 'react';
import StellarSdk from 'stellar-sdk';

class Keypair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    }
  }

  //Highlight selected key
  handleSelect(e) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(e.target.id));
        return range.select;
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(e.target.id));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
  }

  render() {
    if (this.props.privkey && this.props.pubkey) {
      return (
        <div className="keypair-panel">
          <div className="row">
            <div className="col s10 offset-s1" style={{ marginTop: "20px" }}>
              <div className="row">
                Public Key
                <div className="key-container">
                  <div id="pubkey" onClick={ this.handleSelect } style={{ marginTop: '12.5px' }} className="content">{ this.props.pubkey }</div>
                </div>
              </div>
              <div className="row">
                Secret Key - <b>Warning:</b> Save and keep this secure
                <div className="key-container">
                  <div id="privkey" onClick={ this.handleSelect } style={{ marginTop: '12.5px' }} className="content">{ this.props.privkey }</div>
                </div>
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
