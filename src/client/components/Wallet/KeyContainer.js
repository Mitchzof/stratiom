import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StellarSdk from 'stellar-sdk';
import KeyLink from '../Key/KeyLink';
import KeyInput from './KeyInput';

const selectedStyle = {
  backgroundColor: '#3f7bde',
  color: 'white'
}

const unselectedStyle = {
  backgroundColor: '#fff',
  color: 'black'
}

class KeyContainer extends Component {
  constructor(props) {
    super(props);
    this.privkey = this.privkey.bind(this);
    this.ledger = this.ledger.bind(this);
    this.state = {
      method: 'privkey'
    };
  }

  privkey(e) {
    this.setState({ method: 'privkey' });
  }

  ledger(e) {
    this.setState({ method: 'ledger' });
  }

  render() {
    return (
      <div className="container valign-wrapper" style={{ minHeight: '100vh' }}>
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="col">
                <div className="selection-container">
                  <a style={(this.state.method == 'privkey') ? selectedStyle : unselectedStyle } onClick={ this.privkey }>
                    Private Key
                  </a>
                  <a style={(this.state.method == 'ledger') ? selectedStyle : unselectedStyle } onClick={ this.ledger }>
                    Ledger
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <KeyInput dispatch={ this.props.dispatch } method={ this.state.method } />
                <KeyLink />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KeyContainer;
