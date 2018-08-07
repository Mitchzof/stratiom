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
      <div className="container vertical-center" style={{ minHeight: '100vh' }}>
        <div className="row input-offset">
          <div className="col s12">
            <div className="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="selection-container" style={{ marginBottom: '15px' }}>
                <a style={(this.state.method == 'privkey') ? selectedStyle : unselectedStyle } onClick={ this.privkey }>
                  Private Key
                </a>
                <a style={(this.state.method == 'ledger') ? selectedStyle : unselectedStyle } onClick={ this.ledger }>
                  Ledger
                </a>
              </div>
              <KeyInput setPrivkey={ this.props.setPrivkey } setPubkey={ this.props.setPubkey } method={ this.state.method } />
              <KeyLink />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KeyContainer;
